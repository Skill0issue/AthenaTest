export type User = {
    id: string;
    firstName: string | "Default First Name";
    lastName: string;
    Email: string;
    Password: string; // TODO: remove this in production 
    isAdmin: boolean | false;
    department: string;
    jobTitle: string;
    startDate: string;
    category: string;
    gender: string;
}