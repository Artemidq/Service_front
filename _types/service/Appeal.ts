import {TypeService} from "@/_types/service/TypeService";
import {User} from "@/_types/user";
import {Status} from "@/_types/service/Status";

export interface Appeal {
  id: number,
  message: string,
  status: Status,
  type: TypeService,
  user: User,
  created_at: string,
  updated_at: string,
}