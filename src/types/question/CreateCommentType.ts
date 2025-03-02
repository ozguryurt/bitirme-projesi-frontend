export default interface CreateCommentType {
    comment: string;
    user_uuid: string;
    question_uuid: string;
    form?: any;
}