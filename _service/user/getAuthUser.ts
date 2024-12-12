import axios from "axios";

export default async function getAuthUser(token: string) {
  try {
    const response = await axios.get('http://servicerepair/api/user', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}