// // utils/api.ts
// import { Lead } from '@/app/leads/types';
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000/v1/leads', // Your backend API URL
// });

// export const fetchLeads = async () => {
//   const response = await api.get('/');
//   return response.data;
// };

// export const createLead = async (leadData:Lead) => {
//   const response = await api.post('/', leadData);
//   return response.data;
// };

// export const updateLead = async (id:string, leadData:Lead) => {
//   const response = await api.put(`/${id}`, leadData);
//   return response.data;
// };

// export const deleteLead = async (id:string) => {
//   const response = await api.delete(`/${id}`);
//   return response.data;
// };

// utils/api.ts
import axios from 'axios';
import { IActivity, CreateActivityInput } from '@/app/leads/activities/types';

const API_BASE_URL = 'http://localhost:3000/v1/activities'; // Replace with your backend URL

export const fetchActivities = async (): Promise<IActivity[]> => {
  const response = await axios.get(`${API_BASE_URL}/activities`);
  return response.data.data;
};

export const createActivity = async (newActivity: CreateActivityInput): Promise<IActivity> => {
  const response = await axios.post(`${API_BASE_URL}/activities`, newActivity);
  return response.data;
};

export const deleteActivity = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/activities/${id}`);
};

