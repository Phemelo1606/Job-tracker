



export interface User {
    id: number;
    email: string;
    name: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
        name: string;

}