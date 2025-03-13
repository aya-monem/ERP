import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

interface EditAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
  onUpdateAsset?: (assetData: any) => void;
}

export default function EditAssetModal({
  open,
  onOpenChange,
  asset,
  onUpdateAsset,
}: EditAssetModalProps) {
  const [assetData, setAssetData] = useState({
    name: "",
    type: "",
    facility: "",
    status: "",
    purchaseDate: new Date(),
    value: "",
    description: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    condition: "",
    lastMaintenance: new Date(),
    nextMaintenance: new Date(),
    warrantyExpiration: new Date(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (asset && open) {
      setAssetData({
        name: asset.name || "",
        type: asset.type || "",
        facility: asset.facility || "",
        status: asset.status || "Operational",
        purchaseDate: asset.purchaseDate
          ? new Date(asset.purchaseDate)
          : new Date(),
        value: asset.value?.replace(/[^0-9.]/g, "") || "",
        description: asset.description || "",
        manufacturer: asset.manufacturer || "",
        model: asset.model || "",
        serialNumber: asset.serialNumber || "",
        condition: asset.condition || "Good",
        lastMaintenance: asset.lastMaintenance
          ? new Date(asset.lastMaintenance)
          : new Date(),
        nextMaintenance: asset.nextMaintenance
          ? new Date(asset.nextMaintenance)
          : new Date(),
        warrantyExpiration: asset.warrantyExpiration
          ? new Date(asset.warrantyExpiration)
          : new Date(),
      });
    }
  }, [asset, open]);

  const handleChange = (field: string, value: any) => {
    setAssetData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onUpdateAsset) {
        const updatedAsset = {
          ...asset,
          ...assetData,
          value: assetData.value ? `$${assetData.value}` : asset.value,
          purchaseDate: format(assetData.purchaseDate, "yyyy-MM-dd"),
          lastMaintenance: format(assetData.lastMaintenance, "yyyy-MM-dd"),
          nextMaintenance: format(assetData.nextMaintenance, "yyyy-MM-dd"),
          warrantyExpiration: format(
            assetData.warrantyExpiration,
            "yyyy-MM-dd",
          ),
        };
        onUpdateAsset(updatedAsset);
      }
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Edit Asset
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Update the details of {asset.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#424242]">
                Asset Name <span className="text-[#f44336]">*</span>
              </Label>
              <Input
                id="name"
                value={assetData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-[#424242]">
                Asset Type <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={assetData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Power">Power</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facility" className="text-[#424242]">
                Facility <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={assetData.facility}
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
              <Label htmlFor="status" className="text-[#424242]">
                Status
              </Label>
              <Select
                value={assetData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operational">Operational</SelectItem>
                  <SelectItem value="Needs Maintenance">
                    Needs Maintenance
                  </SelectItem>
                  <SelectItem value="Under Repair">Under Repair</SelectItem>
                  <SelectItem value="Decommissioned">Decommissioned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchaseDate" className="text-[#424242]">
                Purchase Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]",
                      !assetData.purchaseDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {assetData.purchaseDate ? (
                      format(assetData.purchaseDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={assetData.purchaseDate}
                    onSelect={(date) => handleChange("purchaseDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value" className="text-[#424242]">
                Value
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#757575]">
                  $
                </span>
                <Input
                  id="value"
                  value={assetData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                  className="pl-6 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastMaintenance" className="text-[#424242]">
                Last Maintenance Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]",
                      !assetData.lastMaintenance && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {assetData.lastMaintenance ? (
                      format(assetData.lastMaintenance, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={assetData.lastMaintenance}
                    onSelect={(date) => handleChange("lastMaintenance", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextMaintenance" className="text-[#424242]">
                Next Maintenance Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]",
                      !assetData.nextMaintenance && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {assetData.nextMaintenance ? (
                      format(assetData.nextMaintenance, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={assetData.nextMaintenance}
                    onSelect={(date) => handleChange("nextMaintenance", date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufacturer" className="text-[#424242]">
                Manufacturer
              </Label>
              <Input
                id="manufacturer"
                value={assetData.manufacturer}
                onChange={(e) => handleChange("manufacturer", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="text-[#424242]">
                Model
              </Label>
              <Input
                id="model"
                value={assetData.model}
                onChange={(e) => handleChange("model", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialNumber" className="text-[#424242]">
                Serial Number
              </Label>
              <Input
                id="serialNumber"
                value={assetData.serialNumber}
                onChange={(e) => handleChange("serialNumber", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition" className="text-[#424242]">
                Condition
              </Label>
              <Select
                value={assetData.condition}
                onValueChange={(value) => handleChange("condition", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#424242]">
              Description
            </Label>
            <Textarea
              id="description"
              value={assetData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="min-h-[100px] border-[#e0e0e0] focus-visible:ring-[#1976d2]"
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
              !assetData.name ||
              !assetData.type ||
              !assetData.facility
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
