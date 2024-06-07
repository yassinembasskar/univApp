import { Repost } from "src/entities/repost.entity";
export class RepostResponseDto {
    repostId: number;
    userId: number;
    postId: number;
    repostComment: string;
    repostDate: Date;
    constructor(repost: Repost) {
      this.userId = repost.userId;
      this.postId = repost.postId;
      this.repostComment = repost.repostComment;
      this.repostDate = repost.repostDate;
      this.repostId = repost.repostId;
    }
  }