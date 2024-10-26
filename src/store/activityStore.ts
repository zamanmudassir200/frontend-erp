// store/useActivityStore.ts
import { create } from 'zustand';
import { IActivity } from '@/app/leads/activities/types';

interface ActivityStore {
  activities: IActivity[];
  setActivities: (activities: IActivity[]) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  setActivities: (activities) => set({ activities }),
}));
