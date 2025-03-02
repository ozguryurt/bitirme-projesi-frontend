import UserType from "../UserType";
import QuestionTagType from "./QuestionTagType";

export default interface QuestionType {
    uuid: string;
    header: string;
    content: string;
    image: any;
    user_uuid: string;
    Tags: QuestionTagType[];
    User: UserType;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt?: string | null;
}