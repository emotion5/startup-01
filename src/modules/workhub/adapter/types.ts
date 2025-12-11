export interface WorkHubProject {
    id: string;
    name: string;
    description: string;
    visibility: 'public' | 'private';
    status: string;
}
