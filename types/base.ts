export type CardInfos = {
    owner: string;
    cvc: number | null;

}

export interface UserInformations {
    firstname: string;
    lastname: string;
    phone?: string
    email: string;
    adress: {
        country: string;
        city: string;
        street: string;
        zip: string;
    }
}