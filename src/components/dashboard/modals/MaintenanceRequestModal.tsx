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

interface MaintenanceRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitRequest: (requestData: any) => void;
  assets: Array<{ id: string; name: string; type: string; facility: string }>;
}

export default function MaintenanceRequestModal({
  open,
  onOpenChange,
  onSubmitRequest,
  assets,
}: MaintenanceRequestModalProps) {
  const [requestData, setRequestData] = useState({
    title: "",
    description: "",
    assetId: "",
    requestType: "Repair",
    priority: "Medium",
    requestedBy: "",
    requestDate: new Date(),
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setRequestData((prev) => {
      const newData = { ...prev, [field]: value };

      // If asset is selected, auto-fill location based on asset's facility
      if (field === "assetId") {
        const selectedAsset = assets.find((asset) => asset.id === value);
        if (selectedAsset) {
          newData.location = selectedAsset.facility;
        }
      }

      return newData;
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onSubmitRequest) {
        onSubmitRequest(requestData);
      }
      setIsSubmitting(false);
      onOpenChange(false);

      // Reset form
      setRequestData({
        title: "",
        description: "",
        assetId: "",
        requestType: "Repair",
        priority: "Medium",
        requestedBy: "",
        requestDate: new Date(),
        location: "",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Submit Maintenance Request
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Fill in the details to submit a new maintenance request.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#424242]">
              Request Title <span className="text-[#f44336]">*</span>
            </Label>
            <Input
              id="title"
              value={requestData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Broken Office Printer"
              className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="asset" className="text-[#424242]">
                Asset <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={requestData.assetId}
                onValueChange={(value) => handleChange("assetId", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  {assets.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-[#424242]">
                Location <span className="text-[#f44336]">*</span>
              </Label>
              <Input
                id="location"
                value={requestData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Admin Building - 2nd Floor"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requestType" className="text-[#424242]">
                Request Type <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={requestData.requestType}
                onValueChange={(value) => handleChange("requestType", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Repair">Repair</SelectItem>
                  <SelectItem value="Replacement">Replacement</SelectItem>
                  <SelectItem value="Inspection">Inspection</SelectItem>
                  <SelectItem value="Installation">Installation</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-[#424242]">
                Priority <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={requestData.priority}
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
              <Label htmlFor="requestedBy" className="text-[#424242]">
                Requested By <span className="text-[#f44336]">*</span>
              </Label>
              <Input
                id="requestedBy"
                value={requestData.requestedBy}
                onChange={(e) => handleChange("requestedBy", e.target.value)}
                placeholder="John Doe"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requestDate" className="text-[#424242]">
                Request Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {requestData.requestDate ? (
                      format(requestData.requestDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={requestData.requestDate}
                    onSelect={(date) => handleChange("requestDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#424242]">
              Description <span className="text-[#f44336]">*</span>
            </Label>
            <Textarea
              id="description"
              value={requestData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Please describe the issue in detail"
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
              !requestData.title ||
              !requestData.assetId ||
              !requestData.location ||
              !requestData.requestedBy ||
              !requestData.description
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
