import axios from "axios";
import {User} from "@/_types/user";

interface IGetAllAppealBySearchParams {
  user: User
  search: string
  type?: 'all'
}

export default async function getAllAppealBySearch({user, ...params}: IGetAllAppealBySearchParams) {
  try {
    const response = await axios.get('http://servicerepair/api/appeal/search', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.api_token
      },
      params
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
