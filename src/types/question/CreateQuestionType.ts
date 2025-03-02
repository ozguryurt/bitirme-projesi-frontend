export default interface CreateQuestionType {
    header: string;
    content: string;
    user_uuid: string;
    form?: any;
    tags: string[]
}