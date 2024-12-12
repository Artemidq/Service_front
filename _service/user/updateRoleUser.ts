import axios from "axios";
import {User} from "@/_types/user";

export default async function updateRoleUser(id: number, role_id: number, user: User):Promise<boolean> {
  try {
    const response = await axios.post('http://servicerepair/api/user/' + (id.toString()) + '/update', {role_id},{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.api_token
      }
    });

    if (response.status === 200) {
      console.error(true)
      return true
    }

    console.error(false)
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}