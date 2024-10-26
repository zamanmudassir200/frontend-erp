// hooks/useActivities.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchActivities, createActivity, deleteActivity } from '@/utils/api';
import { IActivity, CreateActivityInput } from '@/app/leads/activities/types';

export const useActivities = () => {
  return useQuery<IActivity[]>('activities', fetchActivities);
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation((newActivity: CreateActivityInput) => createActivity(newActivity), {
    onSuccess: () => {
      queryClient.invalidateQueries('activities');
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteActivity(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('activities');
    },
  });
};
