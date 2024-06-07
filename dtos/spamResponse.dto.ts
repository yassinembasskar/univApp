export class SpamResponseDto {
    spamId: number;
    reportedById: number | null;
    reporterId: number;
    postId: number | null;
    spamType: string;
    spamContent: string;
    spamSource: string;
  }
  