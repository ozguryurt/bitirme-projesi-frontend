export default interface UserType {
    uuid: string;
    name: string;
    lastname: string;
    nickname: string;
    password: string;
    email: string;
    tel: string;
    role: string;
    avatar: string;
    CreatedAt: string | null;
    UpdatedAt: string | null;
    DeletedAt: string | null;
}