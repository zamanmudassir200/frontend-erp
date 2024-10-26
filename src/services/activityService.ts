// services/activityService.ts
import axios from 'axios';

export const getActivities = async (leadId: string) => {
  const response = await axios.get(`http://localhost/3000/v1/activities`);
  return response.data;
};
