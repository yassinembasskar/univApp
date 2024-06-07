import { PDF } from "src/entities/pdf.entity";
import { Session } from "src/entities/session.entity";
import { User } from "src/entities/user.entity";
export class SessionResponseDto {
    sessionId: number;
    user: User;
    userId: number;
    indexName: string;
    sessionName: string;
    sessionDate: Date;
    sessionLink: string;
    pdfs: PDF[];
    constructor(session: Session) {
        this.sessionId = session.sessionId;
        this.user = session.user;
        this.sessionName = session.sessionName;
        this.sessionDate = session.sessionDate;
        this.sessionLink = session.sessionLink;
        this.pdfs = session.pdfs;
      }
}
  