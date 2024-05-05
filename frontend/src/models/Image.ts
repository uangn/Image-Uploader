export default interface Image {
  _id: string;
  reaction: {
    like: number;
    cute: number;
    hot: number;
    cool: number;
  };
  imageURL: string;
  title: string;
  postByUser: string;
  content: string;
  comment: string[]; // Assuming comment IDs are string
  __v: number;
}
