import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkOrder } from "../WorkOrders";

interface EditWorkOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workOrder: WorkOrder;
  onUpdateWorkOrder: (updatedWorkOrder: WorkOrder) => void;
}

export default function EditWorkOrderModal({
  open,
  onOpenChange,
  workOrder,
  onUpdateWorkOrder,
}: EditWorkOrderModalProps) {
  const [formData, setFormData] = useState<WorkOrder>({
    ...workOrder,
  });

  const handleChange = (field: keyof WorkOrder, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWorkOrder(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#212121]">
            Edit Work Order
          </DialogTitle>
          <DialogDescription className="text-[#616161]">
            Update the details of this work order.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="id" className="text-[#616161]">
                  ID
                </Label>
                <Input
                  id="id"
                  value={formData.id}
                  className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-[#616161]">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleChange("status", value as WorkOrder["status"])
                  }
                >
                  <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="title" className="text-[#616161]">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facility" className="text-[#616161]">
                  Facility
                </Label>
                <Select
                  value={formData.facility}
                  onValueChange={(value) => handleChange("facility", value)}
                >
                  <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                    <SelectValue placeholder="Select facility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Building">Main Building</SelectItem>
                    <SelectItem value="Warehouse">Warehouse</SelectItem>
                    <SelectItem value="Office Building">
                      Office Building
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority" className="text-[#616161]">
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleChange("priority", value as WorkOrder["priority"])
                  }
                >
                  <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignedTo" className="text-[#616161]">
                  Assigned To
                </Label>
                <Input
                  id="assignedTo"
                  value={formData.assignedTo}
                  onChange={(e) => handleChange("assignedTo", e.target.value)}
                  className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                />
              </div>
              <div>
                <Label htmlFor="dueDate" className="text-[#616161]">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1976d2] hover:bg-[#1565c0]">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
