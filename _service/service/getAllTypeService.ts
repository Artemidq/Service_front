import axios from "axios";

export default async function getAllTypeService() {
  try {
    const response = await axios.get('http://servicerepair/api/type-service', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}