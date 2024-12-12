import axios from "axios";
import {User} from "@/_types/user";

export default async function updateStatusAppeal(id: number, status_id: number, user: User) {
  try {
    const response = await axios.post('http://servicerepair/api/appeal/' + (id.toString()) + '/update', {status_id},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.api_token
      }
    });
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}