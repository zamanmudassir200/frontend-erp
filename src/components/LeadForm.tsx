
"use client";
import { useState, useEffect } from "react";
import { createLead, updateLead } from "../services/leadService";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label"
import { Lead } from "@/app/leads/types";

interface LeadFormProps {
  isEditing?: boolean;
  leadToEdit?: Lead | null; 
  onClose: () => void; 
}

export default function LeadForm({ isEditing = false, leadToEdit = null, onClose }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    leadSource: "",
    status: "New",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isEditing && leadToEdit) {
      setFormData({
        name: leadToEdit.name || "",
        email: leadToEdit.email || "",
        phone: leadToEdit.phone || "",
        leadSource: leadToEdit.leadSource || "",
        status: leadToEdit.status || "New",
      });
    }
  }, [isEditing, leadToEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isEditing && leadToEdit) {
        await updateLead(leadToEdit._id, formData);
      } else {
        await createLead(formData);
      }
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error updating or creating lead:", error);
    }
  };

  return (
    <form className="max-w-[700px] mx-auto flex flex-col gap-4 border-2 rounded-xl p-5" onSubmit={handleSubmit}>
      <Label>Name</Label>
      <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
      <Label>Email</Label>

      <Input required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
      <Label>Phone</Label>

      <Input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone" />
      <Label>Lead Source</Label>

      <Input required value={formData.leadSource} onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })} placeholder="Lead Source" />
      <Label>Status</Label>

      <Input disabled  value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} placeholder="Status" />
      <Button type="submit">{isEditing ? "Update Lead" : "Create Lead"}</Button>
    </form>
  );
}
