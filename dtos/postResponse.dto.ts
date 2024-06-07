import { Image } from "src/entities/image.entity";
import { React} from "src/entities/react.entity";
import { Repost } from "src/entities/repost.entity";
import { Post} from "src/entities/post.entity";
import { Save } from "src/entities/save.entity";
import { Comment } from "src/entities/comment.entity";
export class PostResponseDto {
    postId: number;
    userId: number;
    postContent: string;
    postDate: Date;
    postVisibility: string;
    postViews: number;
    comments: Comment[];
    images: Image[];
    reacts: React[];
    reposts: Repost[];
    saves: Save[]
    constructor(post: Post) {
      this.userId = post.userId;
      this.postId = post.postId;
      this.postContent = post.postContent;
      this.postDate = post.postDate;
      this.reacts = post.reacts;
      this.comments = post.comments;
      this.saves = post.saves;
      this.images = post.images;
    }
  }