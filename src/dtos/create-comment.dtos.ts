export interface CreateComment {
  userId: string;
  tweetId: string;
  content: string;
  createdAt?: Date;
}
