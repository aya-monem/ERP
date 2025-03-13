import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Paperclip } from "lucide-react";

interface AddWorkOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWorkOrder?: (workOrderData: any) => void;
}

export default function AddWorkOrderModal({
  open,
  onOpenChange,
  onAddWorkOrder,
}: AddWorkOrderModalProps) {
  const [workOrderData, setWorkOrderData] = useState({
    title: "",
    description: "",
    facility: "",
    asset: "",
    priority: "Medium",
    status: "Open",
    assignedTo: "",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    estimatedHours: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setWorkOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onAddWorkOrder) {
        onAddWorkOrder(workOrderData);
      }
      setIsSubmitting(false);
      onOpenChange(false);

      // Reset form
      setWorkOrderData({
        title: "",
        description: "",
        facility: "",
        asset: "",
        priority: "Medium",
        status: "Open",
        assignedTo: "",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        estimatedHours: "",
        category: "",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Create Work Order
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Fill in the details to create a new work order.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#424242]">
              Work Order Title <span className="text-[#f44336]">*</span>
            </Label>
            <Input
              id="title"
              value={workOrderData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="HVAC Repair - 3rd Floor"
              className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facility" className="text-[#424242]">
                Facility <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={workOrderData.facility}
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

            <div className="space-y-2">
              <Label htmlFor="asset" className="text-[#424242]">
                Asset
              </Label>
              <Select
                value={workOrderData.asset}
                onValueChange={(value) => handleChange("asset", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HVAC System - 3rd Floor">
                    HVAC System - 3rd Floor
                  </SelectItem>
                  <SelectItem value="Elevator #2">Elevator #2</SelectItem>
                  <SelectItem value="Security Camera System">
                    Security Camera System
                  </SelectItem>
                  <SelectItem value="Backup Generator">
                    Backup Generator
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-[#424242]">
                Priority <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={workOrderData.priority}
                onValueChange={(value) => handleChange("priority", value)}
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

            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#424242]">
                Status
              </Label>
              <Select
                value={workOrderData.status}
                onValueChange={(value) => handleChange("status", value)}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo" className="text-[#424242]">
                Assigned To
              </Label>
              <Select
                value={workOrderData.assignedTo}
                onValueChange={(value) => handleChange("assignedTo", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                  <SelectItem value="Sarah Williams">Sarah Williams</SelectItem>
                  <SelectItem value="Robert Davis">Robert Davis</SelectItem>
                  <SelectItem value="Jennifer Lee">Jennifer Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-[#424242]">
                Due Date <span className="text-[#f44336]">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {workOrderData.dueDate ? (
                      format(workOrderData.dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={workOrderData.dueDate}
                    onSelect={(date) => handleChange("dueDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimatedHours" className="text-[#424242]">
                Estimated Hours
              </Label>
              <Input
                id="estimatedHours"
                type="number"
                value={workOrderData.estimatedHours}
                onChange={(e) => handleChange("estimatedHours", e.target.value)}
                placeholder="2"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#424242]">
                Category
              </Label>
              <Select
                value={workOrderData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preventive">
                    Preventive Maintenance
                  </SelectItem>
                  <SelectItem value="Corrective">
                    Corrective Maintenance
                  </SelectItem>
                  <SelectItem value="Emergency">Emergency Repair</SelectItem>
                  <SelectItem value="Inspection">Inspection</SelectItem>
                  <SelectItem value="Installation">Installation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#424242]">
              Description <span className="text-[#f44336]">*</span>
            </Label>
            <Textarea
              id="description"
              value={workOrderData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the issue and work to be performed"
              className="min-h-[100px] border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#424242]">Attachments</Label>
            <div className="border-2 border-dashed border-[#e0e0e0] rounded-md p-6 flex flex-col items-center justify-center hover:border-[#1976d2] transition-colors cursor-pointer">
              <Paperclip className="h-10 w-10 text-[#9e9e9e] mb-2" />
              <p className="text-sm text-[#616161] font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[#9e9e9e] mt-1">
                PDF, DOC, JPG, PNG (max. 10MB)
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#1976d2] hover:bg-[#1565c0]"
            disabled={
              isSubmitting ||
              !workOrderData.title ||
              !workOrderData.facility ||
              !workOrderData.description ||
              !workOrderData.dueDate
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Creating...
              </>
            ) : (
              "Create Work Order"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
