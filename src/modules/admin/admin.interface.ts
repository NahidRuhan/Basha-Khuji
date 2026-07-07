import { UserStatus } from "../../../generated/prisma/enums";

export interface IChangeUserStatus {
    status: UserStatus;
}

export interface ICreateCategory {
    categoryName: string;
}
