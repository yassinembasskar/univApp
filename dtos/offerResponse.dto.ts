import { Offer } from "src/entities/offer.entity";

export class OfferResponseDto {
  offerId: number;
  offerUnivName: string;
  offerUnivWebsite: string;
  offerUnivLocation: string;
  offerStatus: string;
  offerResponse: string;
  offerAdminEmail: string;
  offerAdminPassword: string;
  offerUnivLogo: string;

  constructor(offer: Offer) {
    this.offerId = offer.offerId;
    this.offerUnivName = offer.offerUnivName;
    this.offerUnivWebsite = offer.offerUnivWebsite;
    this.offerUnivLocation = offer.offerUnivLocation;
    this.offerStatus = offer.offerStatus;
    this.offerResponse = offer.offerResponse;
    this.offerAdminEmail = offer.offerAdminEmail;
    this.offerUnivLogo = offer.offerUnivLogo;
  }
}