// components/ActivityForm.tsx
"use client"
import { useState } from 'react';
import { useCreateActivity } from '@/hooks/useActivities';
import { Button} from '@/components/ui/button';
import { Input} from '@/components/ui/input';
import { Select} from '@/components/ui/select';

const ActivityForm = () => {
  const [leadId, setLeadId] = useState('');
  const [activityType, setActivityType] = useState('Call');
  const [description, setDescription] = useState('');
  const [assignedSalesRep, setAssignedSalesRep] = useState('');

  const { mutate: createActivity } = useCreateActivity();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createActivity({
      leadId,
      activityType,
      description,
      assignedSalesRep,
      dateTime: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={leadId}
        onChange={(e) => setLeadId(e.target.value)}
      />
      <Select
        value={activityType}
        onChange={(e) => setActivityType(e.target.value)}
      >
        <option value="Call">Call</option>
        <option value="Email">Email</option>
        <option value="Meeting">Meeting</option>
      </Select>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        value={assignedSalesRep}
        onChange={(e) => setAssignedSalesRep(e.target.value)}
      />
      <Button type="submit">Log Activity</Button>
    </form>
  );
};

export default ActivityForm;
