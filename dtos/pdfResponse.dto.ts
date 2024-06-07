import { PDF } from "src/entities/pdf.entity";
import { Session } from "src/entities/session.entity";

export class PdfResponseDto {
    pdfId: number;
    pdfName: string;
    pdfLink: string;
    session: Session;
    constructor(pdf: PDF) {
      this.session = pdf.session;
      this.pdfId = pdf.pdfId;
      this.pdfLink = pdf.pdfLink;
      this.pdfName = pdf.pdfName;
    }
  }