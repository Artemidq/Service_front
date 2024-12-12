import axios from "axios";

export default async function getAllRole() {
  try {
    const response = await axios.get('http://servicerepair/api/role', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}