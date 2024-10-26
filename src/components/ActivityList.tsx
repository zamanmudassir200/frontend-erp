// components/ActivityList.tsx
"use client"
import { useActivities, useDeleteActivity } from '@/hooks/useActivities';
import { Button } from '@/components/ui/button';

const ActivityList = () => {
  const { data: activities, isLoading } = useActivities();
  const { mutate: deleteActivity } = useDeleteActivity();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {activities?.map((activity) => (
        <div key={activity._id} className="border-b p-2 flex justify-between">
          <div>
            <p>Type: {activity.activityType}</p>
            <p>Description: {activity.description}</p>
            <p>Date: {new Date(activity.dateTime).toLocaleString()}</p>
            <p>Sales Rep: {activity.assignedSalesRep}</p>
          </div>
          <Button onClick={() => deleteActivity(activity._id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
