import axios from 'axios';
import { User } from "@/_types/user";

export default async function updateCategoryService(id: number, name: string, user: User): Promise<boolean> {
  try {
    const response = await axios.post('http://servicerepair/api/category-service/'+ (id) +'/update',
      { id,  name }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user?.api_token
        }
      });

    if (response.status === 200) {
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