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
import { Calendar as CalendarIcon, Upload, MapPin } from "lucide-react";

interface AddFacilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFacility?: (facilityData: any) => void;
}

export default function AddFacilityModal({
  open,
  onOpenChange,
  onAddFacility,
}: AddFacilityModalProps) {
  const [facilityData, setFacilityData] = useState({
    name: "",
    location: "",
    type: "",
    status: "Operational",
    totalCapacity: "",
    squareFootage: "",
    yearBuilt: "",
    lastInspection: new Date(),
    description: "",
    manager: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFacilityData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onAddFacility) {
        onAddFacility(facilityData);
      }
      setIsSubmitting(false);
      onOpenChange(false);

      // Reset form
      setFacilityData({
        name: "",
        location: "",
        type: "",
        status: "Operational",
        totalCapacity: "",
        squareFootage: "",
        yearBuilt: "",
        lastInspection: new Date(),
        description: "",
        manager: "",
        contactPhone: "",
        contactEmail: "",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Add New Facility
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Fill in the details to add a new facility to the system.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#424242]">
                Facility Name <span className="text-[#f44336]">*</span>
              </Label>
              <Input
                id="name"
                value={facilityData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Main Building"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-[#424242]">
                Facility Type <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={facilityData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Storage">Storage/Warehouse</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="Training">Training Center</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-[#424242]">
              Location <span className="text-[#f44336]">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#9e9e9e]" />
              <Input
                id="location"
                value={facilityData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="123 Corporate Drive, New York, NY"
                className="pl-10 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#424242]">
                Status
              </Label>
              <Select
                value={facilityData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operational">Operational</SelectItem>
                  <SelectItem value="Under Maintenance">
                    Under Maintenance
                  </SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalCapacity" className="text-[#424242]">
                Total Capacity
              </Label>
              <Input
                id="totalCapacity"
                type="number"
                value={facilityData.totalCapacity}
                onChange={(e) => handleChange("totalCapacity", e.target.value)}
                placeholder="300"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="squareFootage" className="text-[#424242]">
                Square Footage
              </Label>
              <Input
                id="squareFootage"
                value={facilityData.squareFootage}
                onChange={(e) => handleChange("squareFootage", e.target.value)}
                placeholder="25000"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearBuilt" className="text-[#424242]">
                Year Built
              </Label>
              <Input
                id="yearBuilt"
                value={facilityData.yearBuilt}
                onChange={(e) => handleChange("yearBuilt", e.target.value)}
                placeholder="2010"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastInspection" className="text-[#424242]">
              Last Inspection Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                  {facilityData.lastInspection ? (
                    format(facilityData.lastInspection, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={facilityData.lastInspection}
                  onSelect={(date) => handleChange("lastInspection", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#424242]">
              Description
            </Label>
            <Textarea
              id="description"
              value={facilityData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter facility description and additional details"
              className="min-h-[100px] border-[#e0e0e0] focus-visible:ring-[#1976d2]"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-medium text-[#424242]">
              Facility Contact Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manager" className="text-[#424242]">
                  Facility Manager
                </Label>
                <Input
                  id="manager"
                  value={facilityData.manager}
                  onChange={(e) => handleChange("manager", e.target.value)}
                  placeholder="John Smith"
                  className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-[#424242]">
                  Contact Phone
                </Label>
                <Input
                  id="contactPhone"
                  value={facilityData.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-[#424242]">
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={facilityData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                placeholder="john.smith@example.com"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#424242]">Facility Image</Label>
            <div className="border-2 border-dashed border-[#e0e0e0] rounded-md p-6 flex flex-col items-center justify-center hover:border-[#1976d2] transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-[#9e9e9e] mb-2" />
              <p className="text-sm text-[#616161] font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[#9e9e9e] mt-1">
                SVG, PNG, JPG (max. 5MB)
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
              !facilityData.name ||
              !facilityData.type ||
              !facilityData.location
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              "Save Facility"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
