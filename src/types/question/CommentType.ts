import UserType from "../UserType";

export default interface CommentType {
    uuid: string;
    question_uuid: string;
    user_uuid: string;
    comment: any;
    image?: string[];
    user: UserType;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt?: string | null;
}