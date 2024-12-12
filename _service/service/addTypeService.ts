import axios from 'axios';
import { User } from "@/_types/user";

export default async function addTypeService(name: string, category_id: number, user: User): Promise<boolean> {
  try {
    const response = await axios.post('http://servicerepair/api/type-service/store',
      { name, category_id }, {
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