import axios from "axios";
import {User} from "@/_types/user";

export default async function getAllAppeal(user: User) {
  try {
    const response = await axios.get('http://servicerepair/api/appeal', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.api_token
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}