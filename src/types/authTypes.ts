export interface IUser {
    name: string | null ;
    email: string | null;
}

export interface IEnterInPayload {
    token: string;
    user: IUser;
}

export interface IEnterData {
    email: string;
    password: string;
}

export interface IEnterDataForRegistration extends IEnterData {
    name: string;
}