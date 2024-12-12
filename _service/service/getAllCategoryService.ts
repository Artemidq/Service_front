import axios from "axios";

export default async function getAllCategoryService() {
  try {
    const response = await axios.get('http://servicerepair/api/category-service', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}