export default interface CommentPost {
  reaction: {
    like: number;
    cute: number;
    cool: number;
  };
  _id: string;
  commentByUser: {
    _id: string;
    username: string;
    profileImage: string;
  };
  comment: string;
}
