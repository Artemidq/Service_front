import axios from 'axios';
import { User } from "@/_types/user";

export default async function postService(message: string, type_id: number, user: User): Promise<boolean> {
  try {
    const response = await axios.post('http://servicerepair/api/appeal',
      { message, type_id }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user?.api_token
        }
      });

    if (response.status === 201) {
      console.log(true);
      return true;
    }

    console.log(false);
    return false;
  } catch (error) {
    console.log(false);
    return false;
  }
};