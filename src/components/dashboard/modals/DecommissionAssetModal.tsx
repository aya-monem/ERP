import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Calendar as CalendarIcon, AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface DecommissionAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
  onDecommissionAsset?: (decommissionData: any) => void;
}

export default function DecommissionAssetModal({
  open,
  onOpenChange,
  asset,
  onDecommissionAsset,
}: DecommissionAssetModalProps) {
  const [decommissionData, setDecommissionData] = useState({
    reason: "",
    date: new Date(),
    disposalMethod: "",
    notes: "",
    confirmation: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setDecommissionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onDecommissionAsset) {
        onDecommissionAsset({
          ...decommissionData,
          assetId: asset.id,
          assetName: asset.name,
          date: format(decommissionData.date, "yyyy-MM-dd"),
        });
      }
      setIsSubmitting(false);
      onOpenChange(false);

      // Reset form
      setDecommissionData({
        reason: "",
        date: new Date(),
        disposalMethod: "",
        notes: "",
        confirmation: false,
      });
    }, 1000);
  };

  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#f44336] flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Decommission Asset
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            This will permanently mark {asset.name} ({asset.id}) as
            decommissioned. This action cannot be easily reversed.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="bg-[#ffebee] p-4 rounded-md border border-[#f44336] text-[#d32f2f]">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">Warning: Permanent Action</p>
                <p className="text-sm mt-1">
                  Decommissioning an asset will remove it from active inventory
                  and mark it as no longer in use. All scheduled maintenance
                  will be cancelled.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f5f5f5] p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-[#757575]">Asset</p>
                <p className="font-medium text-[#212121]">{asset.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">ID</p>
                <p className="text-[#424242]">{asset.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">Type</p>
                <p className="text-[#424242]">{asset.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">Facility</p>
                <p className="text-[#424242]">{asset.facility}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-[#424242]">
              Reason for Decommissioning{" "}
              <span className="text-[#f44336]">*</span>
            </Label>
            <Input
              id="reason"
              value={decommissionData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              placeholder="End of life cycle, Beyond repair, etc."
              className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-[#424242]">
                Decommission Date <span className="text-[#f44336]">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {decommissionData.date ? (
                      format(decommissionData.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={decommissionData.date}
                    onSelect={(date) => handleChange("date", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="disposalMethod" className="text-[#424242]">
                Disposal Method
              </Label>
              <Input
                id="disposalMethod"
                value={decommissionData.disposalMethod}
                onChange={(e) => handleChange("disposalMethod", e.target.value)}
                placeholder="Recycling, Resale, Disposal, etc."
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-[#424242]">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              value={decommissionData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any additional information about this decommissioning"
              className="min-h-[100px] border-[#e0e0e0] focus-visible:ring-[#1976d2]"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="confirmation"
              checked={decommissionData.confirmation}
              onCheckedChange={(checked) =>
                handleChange("confirmation", checked)
              }
              className="border-[#f44336] data-[state=checked]:bg-[#f44336] data-[state=checked]:border-[#f44336]"
            />
            <label
              htmlFor="confirmation"
              className="text-sm font-medium leading-none text-[#424242] cursor-pointer"
            >
              I confirm that I want to decommission this asset and understand
              this action cannot be easily reversed.
            </label>
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
            variant="destructive"
            className="bg-[#f44336] hover:bg-[#d32f2f]"
            disabled={
              isSubmitting ||
              !decommissionData.reason ||
              !decommissionData.date ||
              !decommissionData.confirmation
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              "Decommission Asset"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
