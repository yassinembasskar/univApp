import { University } from "src/entities/university.entity";
import { User } from "src/entities/user.entity";
export class UniversityResponseDto {
    univId: number;
    univName: string;
    univWebsite: string | null;
    univLocation: string;
    univLogo: string;
    admin: User;
    constructor(univeristy: University, admin: User) {
        this.univId = univeristy.univId;
        this.univName = univeristy.univName;
        this.univWebsite = univeristy.univWebsite;
        this.univLocation = univeristy.univLocation;
        this.univLogo = univeristy.univLogo;
        this.admin = admin;
    }
}