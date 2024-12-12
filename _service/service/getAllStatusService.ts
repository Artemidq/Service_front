import axios from "axios";

export default async function getAllStatusService() {
  try {
    const response = await axios.get('http://servicerepair/api/status-service', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}