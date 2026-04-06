export type RequestType = 'commande' | 'fresque' | 'contact';
export type RequestStatus = 'new' | 'in_review' | 'quoted' | 'closed';

export interface ClientRequest {
    id: string;
    fullName: string;
    email: string;
    type: RequestType;
    status: RequestStatus;
    budget: string;
    location: string;
    createdAt: string;
    message: string;
}
