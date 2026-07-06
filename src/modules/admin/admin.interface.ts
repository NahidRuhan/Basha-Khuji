import { UserStatus } from "../../../generated/prisma/enums";

export interface IChangeUserStatus {
    status: UserStatus;
}
