import { Invitation } from "@prisma/client";
import { BaseRepositoryInterface } from "src/respositories/base/base.interface.respository";

export interface InvitationInterface extends BaseRepositoryInterface<Invitation> {
}