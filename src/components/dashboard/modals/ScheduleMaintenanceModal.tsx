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
import { Calendar as CalendarIcon, Clock } from "lucide-react";

interface ScheduleMaintenanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
  onScheduleMaintenance?: (maintenanceData: any) => void;
}

export default function ScheduleMaintenanceModal({
  open,
  onOpenChange,
  asset,
  onScheduleMaintenance,
}: ScheduleMaintenanceModalProps) {
  const [maintenanceData, setMaintenanceData] = useState({
    title: "",
    description: "",
    type: "Preventive",
    priority: "Medium",
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    estimatedDuration: "",
    assignedTo: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setMaintenanceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onScheduleMaintenance) {
        onScheduleMaintenance({
          ...maintenanceData,
          assetId: asset.id,
          assetName: asset.name,
          scheduledDate: format(maintenanceData.scheduledDate, "yyyy-MM-dd"),
          status: "Scheduled",
          createdAt: format(new Date(), "yyyy-MM-dd"),
        });
      }
      setIsSubmitting(false);
      onOpenChange(false);

      // Reset form
      setMaintenanceData({
        title: "",
        description: "",
        type: "Preventive",
        priority: "Medium",
        scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        estimatedDuration: "",
        assignedTo: "",
        notes: "",
      });
    }, 1000);
  };

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Schedule Maintenance
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Schedule maintenance for {asset.name} ({asset.id}).
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="bg-[#f5f5f5] p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-[#757575]">Asset</p>
                <p className="font-medium text-[#212121]">{asset.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">Type</p>
                <p className="text-[#424242]">{asset.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">Facility</p>
                <p className="text-[#424242]">{asset.facility}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">
                  Last Maintenance
                </p>
                <p className="text-[#424242]">{asset.lastMaintenance}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#424242]">
              Maintenance Title <span className="text-[#f44336]">*</span>
            </Label>
            <Input
              id="title"
              value={maintenanceData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Quarterly Maintenance Check"
              className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-[#424242]">
                Maintenance Type <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={maintenanceData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preventive">Preventive</SelectItem>
                  <SelectItem value="Corrective">Corrective</SelectItem>
                  <SelectItem value="Inspection">Inspection</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-[#424242]">
                Priority <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={maintenanceData.priority}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate" className="text-[#424242]">
                Scheduled Date <span className="text-[#f44336]">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {maintenanceData.scheduledDate ? (
                      format(maintenanceData.scheduledDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={maintenanceData.scheduledDate}
                    onSelect={(date) => handleChange("scheduledDate", date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDuration" className="text-[#424242]">
                Estimated Duration (hours)
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-[#757575]" />
                <Input
                  id="estimatedDuration"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={maintenanceData.estimatedDuration}
                  onChange={(e) =>
                    handleChange("estimatedDuration", e.target.value)
                  }
                  placeholder="2"
                  className="pl-10 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo" className="text-[#424242]">
              Assigned To
            </Label>
            <Select
              value={maintenanceData.assignedTo}
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
            <Label htmlFor="description" className="text-[#424242]">
              Description <span className="text-[#f44336]">*</span>
            </Label>
            <Textarea
              id="description"
              value={maintenanceData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the maintenance to be performed"
              className="min-h-[100px] border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-[#424242]">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              value={maintenanceData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any additional instructions or requirements"
              className="min-h-[80px] border-[#e0e0e0] focus-visible:ring-[#1976d2]"
            />
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
              !maintenanceData.title ||
              !maintenanceData.description ||
              !maintenanceData.scheduledDate
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Scheduling...
              </>
            ) : (
              "Schedule Maintenance"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
