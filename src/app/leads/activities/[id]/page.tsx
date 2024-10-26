// // pages/activities.tsx
// import ActivityForm from '@/components/ActivityForm';
// import ActivityList from '@/components/ActivityList';

// const ActivitiesPage = () => {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Activity Log</h1>
//       <ActivityForm />
//       <ActivityList />
//     </div>
//   );
// };

// export default ActivitiesPage;

"use client";
import { useParams } from 'next/navigation'; // Use useParams instead of useRouter
import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@/services/activityService'; // Import your activity service

export default function LeadActivities() {
  const { id } = useParams(); // Get the 'id' from useParams

  const { data, isLoading, error } = useQuery({
    queryKey: ['activities', id],
    queryFn: () => getActivities(id), // Fetch activities for the specific lead
    enabled: !!id, // Only run query if ID is available
  });

  if (isLoading) return <div>Loading activities...</div>;
  if (error) return <div>Error fetching activities</div>;

  return (
    <div className="my-10 max-w-[1200px] mx-auto">
      <h2 className="my-4 text-2xl font-bold">Activities for Lead {id}</h2>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {data?.data?.length > 0 ? (
          data.data.map((activity: any) => (
            <div key={activity._id} className="p-3 rounded-lg border-2">
              <p><strong>Type:</strong> {activity.activityType}</p>
              <p><strong>Description:</strong> {activity.description}</p>
              <p><strong>Date:</strong> {activity.dateTime}</p>
              <p><strong>Assigned Sales Rep:</strong> {activity.assignedSalesRep}</p>
            </div>
          ))
        ) : (
          <p>No activities logged for this lead.</p>
        )}
      </div>
    </div>
  );
}
