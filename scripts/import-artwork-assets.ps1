param(
    [Parameter(Mandatory = $true)]
    [string]$SourceRoot,

    [string]$WorkspaceRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.Security

$outDir = Join-Path $WorkspaceRoot 'public\images\oeuvres\catalogue'
$manifestPath = Join-Path $WorkspaceRoot 'src\content\artworks\catalogue-artworks.json'

if (-not (Test-Path -LiteralPath $SourceRoot)) {
    throw "Source folder not found: $SourceRoot"
}

if (Test-Path -LiteralPath $outDir) {
    $resolvedOut = (Resolve-Path -LiteralPath $outDir).Path
    if (-not $resolvedOut.StartsWith($WorkspaceRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to delete outside workspace: $resolvedOut"
    }

    Remove-Item -LiteralPath $resolvedOut -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Remove-Diacritics([string]$value) {
    if ([string]::IsNullOrWhiteSpace($value)) {
        return ''
    }

    $normalized = $value.Normalize([Text.NormalizationForm]::FormD)
    $builder = [Text.StringBuilder]::new()

    foreach ($char in $normalized.ToCharArray()) {
        if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($char) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$builder.Append($char)
        }
    }

    return $builder.ToString().Normalize([Text.NormalizationForm]::FormC)
}

function Get-Slug([string]$value) {
    $ascii = (Remove-Diacritics $value).ToLowerInvariant()
    $ascii = $ascii -replace '[^a-z0-9]+', '-'
    $ascii = $ascii.Trim('-')

    if ([string]::IsNullOrWhiteSpace($ascii)) {
        return 'oeuvre'
    }

    return $ascii
}

function Clean-Text([string]$value) {
    if ($null -eq $value) {
        return ''
    }

    $decoded = [System.Net.WebUtility]::HtmlDecode($value)
    $decoded = $decoded -replace [char]0x00A0, ' '
    $decoded = $decoded -replace '\s+', ' '

    return $decoded.Trim()
}

function Get-OdtParagraphs([string]$path) {
    $zip = [System.IO.Compression.ZipFile]::OpenRead($path)

    try {
        $entry = $zip.GetEntry('content.xml')
        if ($null -eq $entry) {
            return @()
        }

        $reader = [IO.StreamReader]::new($entry.Open())

        try {
            $content = $reader.ReadToEnd()
        }
        finally {
            $reader.Dispose()
        }

        return @([regex]::Matches($content, '<text:p[^>]*>(.*?)</text:p>') | ForEach-Object {
            Clean-Text ($_.Groups[1].Value -replace '<[^>]+>', ' ')
        } | Where-Object { $_ })
    }
    finally {
        $zip.Dispose()
    }
}

function Is-YearLine([string]$line) {
    $plain = Remove-Diacritics $line
    return $plain -match '(?i)^(annee)?\s*20\s*\d\s*\d$|^20\s*\d\s*\d$'
}

function Extract-Year([string]$line) {
    if ($line -match '20\s*(\d)\s*(\d)') {
        return [int]("20$($Matches[1])$($Matches[2])")
    }

    return $null
}

function Is-PriceLine([string]$line) {
    return $line -match '(?i)euro'
}

function Extract-Price([string]$line) {
    $clean = $line -replace '[^0-9]', ''

    if ([string]::IsNullOrWhiteSpace($clean)) {
        return $null
    }

    return [int]$clean
}

function Is-DimensionLine([string]$line) {
    return $line -match '(?i)(format|\d+\s*x\s*\d+|\bA[0-6]\b|cm)'
}

function Is-FormatOnly([string]$line) {
    return $line -match '^(?i)(A[0-6]|\d+\s*x\s*\d+\s*cm|\d+x\d+\s*cm)$'
}

function Strip-Quotes([string]$line) {
    $clean = Clean-Text $line
    return $clean.Trim('"').Trim([char]0x00AB, [char]0x00BB, [char]0x201C, [char]0x201D)
}

function Guess-Category([string]$title, [string]$sourceName) {
    $key = (Remove-Diacritics $title).ToLowerInvariant()

    if ($sourceName -match 'affiche') {
        return 'Graphisme'
    }

    if ($sourceName -match 'illustration') {
        return 'Pop Art'
    }

    if ($key -match 'zelda|link|peach|sailor|yuki|katana|geisha|manga') {
        return 'Manga'
    }

    if ($key -match 'joker|catwoman|betty|boop|blanche|freddy|bono|frida|marylin|marilyn|basquiat|johnny|france gall|nina|loana|bb') {
        return 'Pop Art'
    }

    if ($key -match 'paysage|lac|montagne|marin|vase|perroquet|jonquilles|roses|fleur|paon') {
        return 'Graphisme'
    }

    if ($key -match 'street|docker|jean bart') {
        return 'Street Art'
    }

    return 'Portrait'
}

function Build-Meta([string]$title, [string[]]$details, [string]$collection, [string]$sourceName, [string]$variantType) {
    $techniqueLines = New-Object System.Collections.Generic.List[string]
    $dimensionLines = New-Object System.Collections.Generic.List[string]
    $year = $null
    $price = $null

    foreach ($detail in $details) {
        $line = Clean-Text $detail

        if (-not $line) {
            continue
        }

        if ($line -match '20\s*\d\s*\d') {
            $year = Extract-Year $line
            $line = Clean-Text ($line -replace '20\s*\d\s*\d', '')

            if (-not $line) {
                continue
            }
        }

        if (Is-PriceLine $line) {
            $price = Extract-Price $line
            continue
        }

        if (Is-YearLine $line) {
            $year = Extract-Year $line
            continue
        }

        if (Is-DimensionLine $line) {
            [void]$dimensionLines.Add($line)
            continue
        }

        [void]$techniqueLines.Add($line)
    }

    $technique = if ($techniqueLines.Count -gt 0) {
        ($techniqueLines -join ', ')
    }
    elseif ($variantType -eq 'print') {
        'Affiche pigmentaire'
    }
    else {
        'Technique mixte'
    }

    $dimensionText = if ($dimensionLines.Count -gt 0) {
        ($dimensionLines -join ' - ')
    }
    else {
        'Dimensions sur demande'
    }

    $support = if ($dimensionText -match '(?i)toile') {
        'Toile'
    }
    elseif ($dimensionText -match '(?i)carton') {
        'Carton entoile'
    }
    elseif ($variantType -eq 'print') {
        'Papier fine art'
    }
    elseif ($dimensionText -match '(?i)papier') {
        'Papier'
    }
    else {
        'Support sur demande'
    }

    $category = Guess-Category $title $sourceName

    return [ordered]@{
        title = $title
        source = $sourceName
        collection = $collection
        category = $category
        type = $variantType
        technique = $technique
        support = $support
        dimensions = $dimensionText
        year = $year
        priceEur = if ($price) { $price } elseif ($variantType -eq 'print') { 35 } else { 120 }
        stock = if ($variantType -eq 'print') { 50 } else { 1 }
        availability = 'available'
        tags = @($collection.ToLowerInvariant(), $category.ToLowerInvariant(), $variantType)
    }
}

function Guess-FallbackCollection([string]$slug) {
    if ($slug -match '^(duo|serie-7|série-7)') {
        return 'Series et duos'
    }

    return 'Oeuvres libres'
}

function Parse-PricedDocument([string]$path, [string]$collection, [string]$variantType) {
    $paragraphs = Get-OdtParagraphs $path
    $records = New-Object System.Collections.Generic.List[object]
    $i = 0

    while ($i -lt $paragraphs.Count) {
        $line = $paragraphs[$i]

        $plainLine = Remove-Diacritics $line

        if ($plainLine -match '^(?i)(peintures|fusains|serie|categorie\s*:?.*|illustration\s*:?)$') {
            $i++
            continue
        }

        $title = Strip-Quotes $line

        if (-not $title -or (Is-YearLine $title) -or (Is-PriceLine $title) -or (Is-DimensionLine $title)) {
            $i++
            continue
        }

        $i++
        $details = New-Object System.Collections.Generic.List[string]

        while ($i -lt $paragraphs.Count) {
            $next = $paragraphs[$i]

            if ($next -match '^(?i)illustration\s*:?$') {
                $i++
                continue
            }

            [void]$details.Add($next)

            if (Is-PriceLine $next) {
                $i++

                if ($i -lt $paragraphs.Count -and (Is-YearLine $paragraphs[$i])) {
                    [void]$details.Add($paragraphs[$i])
                    $i++
                }

                break
            }

            $i++
        }

        if ($details.Count -gt 0) {
            [void]$records.Add((Build-Meta $title $details.ToArray() $collection ([IO.Path]::GetFileNameWithoutExtension($path)) $variantType))
        }
    }

    return $records
}

function Parse-AfficheDocument([string]$path) {
    $paragraphs = Get-OdtParagraphs $path
    $records = New-Object System.Collections.Generic.List[object]
    $currentTitle = $null
    $sizes = New-Object System.Collections.Generic.List[string]

    foreach ($raw in $paragraphs) {
        $line = Clean-Text $raw

        $plainLine = Remove-Diacritics $line

        if (-not $line -or $plainLine -match '^(?i)categorie|serie metier$') {
            continue
        }

        if (Is-FormatOnly $line) {
            [void]$sizes.Add($line)
            continue
        }

        $plainCandidate = Remove-Diacritics $line

        if ($currentTitle -and $sizes.Count -eq 0 -and $plainCandidate -cmatch '^[a-z]') {
            $currentTitle = "$currentTitle $line"
            continue
        }

        if ($currentTitle) {
            $details = @()

            if ($sizes.Count -gt 0) {
                $details += ('Formats ' + ($sizes -join ' / '))
            }

            [void]$records.Add((Build-Meta $currentTitle $details 'Affiches graphiques' 'Categorie affiche' 'print'))
        }

        $currentTitle = Strip-Quotes $line
        $sizes = New-Object System.Collections.Generic.List[string]
    }

    if ($currentTitle) {
        $details = @()

        if ($sizes.Count -gt 0) {
            $details += ('Formats ' + ($sizes -join ' / '))
        }

        [void]$records.Add((Build-Meta $currentTitle $details 'Affiches graphiques' 'Categorie affiche' 'print'))
    }

    return $records
}

function Get-ImageCodec([string]$mime) {
    return [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq $mime } | Select-Object -First 1
}

$jpegCodec = Get-ImageCodec 'image/jpeg'
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new($encoder, [int64]84)

function Save-OptimizedImage([byte[]]$bytes, [string]$destPath) {
    $inputStream = [IO.MemoryStream]::new($bytes)

    try {
        $image = [System.Drawing.Image]::FromStream($inputStream)
    }
    catch {
        $inputStream.Dispose()
        return $false
    }

    try {
        $maxSide = 1600
        $ratio = [Math]::Min(1.0, $maxSide / [double]([Math]::Max($image.Width, $image.Height)))
        $width = [Math]::Max(1, [int][Math]::Round($image.Width * $ratio))
        $height = [Math]::Max(1, [int][Math]::Round($image.Height * $ratio))
        $bitmap = [System.Drawing.Bitmap]::new($width, $height)

        try {
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

            try {
                $graphics.Clear([System.Drawing.Color]::White)
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $graphics.DrawImage($image, 0, 0, $width, $height)
            }
            finally {
                $graphics.Dispose()
            }

            $bitmap.Save($destPath, $jpegCodec, $encoderParams)
        }
        finally {
            $bitmap.Dispose()
        }

        return $true
    }
    finally {
        $image.Dispose()
        $inputStream.Dispose()
    }
}

function Read-AllBytesFromEntry($entry) {
    $stream = $entry.Open()

    try {
        $memory = [IO.MemoryStream]::new()

        try {
            $stream.CopyTo($memory)
            return $memory.ToArray()
        }
        finally {
            $memory.Dispose()
        }
    }
    finally {
        $stream.Dispose()
    }
}

function Get-Hash([byte[]]$bytes) {
    $sha = [System.Security.Cryptography.SHA256]::Create()

    try {
        return ([BitConverter]::ToString($sha.ComputeHash($bytes))).Replace('-', '').ToLowerInvariant()
    }
    finally {
        $sha.Dispose()
    }
}

$metadata = @{}
$docRecords = @{}
$serieOdt = Get-ChildItem -LiteralPath $SourceRoot -Filter *.odt | Where-Object { (Get-Slug $_.BaseName) -eq 'serie' } | Select-Object -First 1
$docMap = New-Object System.Collections.Generic.List[object]
[void]$docMap.Add(@{ File = Join-Path $SourceRoot 'Peinture.odt'; Collection = 'Peintures originales'; Type = 'original'; Kind = 'priced' })
[void]$docMap.Add(@{ File = Join-Path $SourceRoot 'Fusain.odt'; Collection = 'Fusains et pastels'; Type = 'original'; Kind = 'priced' })
if ($serieOdt) {
    [void]$docMap.Add(@{ File = $serieOdt.FullName; Collection = 'Series et duos'; Type = 'original'; Kind = 'priced' })
}
[void]$docMap.Add(@{ File = Join-Path (Join-Path $SourceRoot 'Image site') 'Categorie illustration.odt'; Collection = 'Illustrations'; Type = 'original'; Kind = 'priced' })
[void]$docMap.Add(@{ File = Join-Path (Join-Path $SourceRoot 'Image site') 'Categorie affiche.odt'; Collection = 'Affiches graphiques'; Type = 'print'; Kind = 'affiche' })

foreach ($doc in $docMap) {
    if (-not (Test-Path -LiteralPath $doc.File)) {
        continue
    }

    $records = if ($doc.Kind -eq 'affiche') {
        Parse-AfficheDocument $doc.File
    }
    else {
        Parse-PricedDocument $doc.File $doc.Collection $doc.Type
    }

    $docRecords[$doc.File] = @($records)

    foreach ($record in $records) {
        $metadata[(Get-Slug $record['title'])] = $record
    }
}

$entries = New-Object System.Collections.Generic.List[object]
$usedSlugs = @{}
$seenSourceHashes = @{}

function Add-Entry([object]$meta, [byte[]]$bytes, [string]$preferredSlug) {
    $baseSlug = Get-Slug $preferredSlug
    $slug = $baseSlug
    $counter = 2

    while ($usedSlugs.ContainsKey($slug)) {
        $slug = "$baseSlug-$counter"
        $counter++
    }

    $dest = Join-Path $outDir "$slug.jpg"

    if (-not (Save-OptimizedImage $bytes $dest)) {
        return $false
    }

    $usedSlugs[$slug] = $true
    $imagePath = "/images/oeuvres/catalogue/$slug.jpg"
    $eAcute = [string][char]0x00E9
    $eGrave = [string][char]0x00E8
    $oeLigature = [string][char]0x0152
    $excerptPrefix = if ($meta['type'] -eq 'print') { "Affiche sign${eAcute}e Norel Art" } else { "${oeLigature}uvre originale Norel Art" }
    $id = 'art-{0:000}' -f ($entries.Count + 1)

    $entry = [ordered]@{
        id = $id
        slug = $slug
        title = $meta['title']
        excerpt = "$excerptPrefix, disponible dans la galerie."
        story = "$($meta['title']) est une pi${eGrave}ce Norel Art r${eAcute}alis${eAcute}e en $($meta['technique']). Support : $($meta['support']). Format : $($meta['dimensions'])."
        image = $imagePath
        gallery = @()
        category = $meta['category']
        collection = $meta['collection']
        type = $meta['type']
        technique = $meta['technique']
        support = $meta['support']
        dimensions = $meta['dimensions']
        priceEur = [int]$meta['priceEur']
        availability = $meta['availability']
        stock = [int]$meta['stock']
        year = $meta['year']
        tags = @($meta['tags'] | ForEach-Object { Get-Slug $_ })
    }

    [void]$entries.Add($entry)

    return $true
}

foreach ($file in Get-ChildItem -LiteralPath $SourceRoot -File -Filter *.jpg | Sort-Object Name) {
    $bytes = [IO.File]::ReadAllBytes($file.FullName)
    $hash = Get-Hash $bytes
    $seenSourceHashes[$hash] = $true
    $title = Clean-Text ([IO.Path]::GetFileNameWithoutExtension($file.Name))
    $slug = Get-Slug $title
    $meta = $metadata[$slug]

    if ($null -eq $meta) {
        $meta = Build-Meta $title @() (Guess-FallbackCollection $slug) $file.Name 'original'
    }
    else {
        $meta['title'] = $title
    }

    [void](Add-Entry $meta $bytes $title)
}

foreach ($doc in $docMap) {
    if (-not (Test-Path -LiteralPath $doc.File)) {
        continue
    }

    $records = @($docRecords[$doc.File])
    $zip = [System.IO.Compression.ZipFile]::OpenRead($doc.File)

    try {
        $pictureEntries = @($zip.Entries | Where-Object {
            $_.FullName -like 'Pictures/*' -and ([IO.Path]::GetExtension($_.FullName).ToLowerInvariant() -in @('.jpg', '.jpeg', '.png'))
        })

        if ($doc.Kind -eq 'affiche' -or $doc.File -match 'Categorie illustration') {
            $pictureEntries = @($pictureEntries | Where-Object {
                [IO.Path]::GetExtension($_.FullName).ToLowerInvariant() -in @('.jpg', '.jpeg')
            })
        }

        $index = 0

        foreach ($pictureEntry in $pictureEntries) {
            if ($index -ge $records.Count) {
                break
            }

            $record = $records[$index]
            $index++

            if ($usedSlugs.ContainsKey((Get-Slug $record['title']))) {
                continue
            }

            $bytes = Read-AllBytesFromEntry $pictureEntry
            $hash = Get-Hash $bytes

            if ($seenSourceHashes.ContainsKey($hash)) {
                continue
            }

            $seenSourceHashes[$hash] = $true
            [void](Add-Entry $record $bytes $record['title'])
        }
    }
    finally {
        $zip.Dispose()
    }
}

$json = $entries | ConvertTo-Json -Depth 8
[IO.File]::WriteAllText($manifestPath, $json, [Text.UTF8Encoding]::new($false))

[pscustomobject]@{
    Entries = $entries.Count
    Images = (Get-ChildItem -LiteralPath $outDir -File -Filter *.jpg | Measure-Object).Count
    Output = $outDir
    Manifest = $manifestPath
}
