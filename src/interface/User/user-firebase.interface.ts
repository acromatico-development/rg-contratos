export interface IUserFirebase {
    uid: string;
    email: string | null;
    displayName: string | null;
    emailVerified: boolean;
    photoURL: string | null;
    phoneNumber: string | null;
    disabled: boolean;
}