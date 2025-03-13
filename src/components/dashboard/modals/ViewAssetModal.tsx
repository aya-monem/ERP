import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Wrench, DollarSign, Tag, Info } from "lucide-react";

interface ViewAssetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
}

export default function ViewAssetModal({
  open,
  onOpenChange,
  asset,
}: ViewAssetModalProps) {
  if (!asset) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Needs Maintenance":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Under Repair":
        return "bg-[#fff8e1] text-[#ffa000] border-[#ffa000]";
      case "Decommissioned":
        return "bg-[#f5f5f5] text-[#9e9e9e] border-[#9e9e9e]";
      default:
        return "";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Good":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      case "Fair":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Poor":
        return "bg-[#ffebee] text-[#f44336] border-[#f44336]";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Asset Details
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            View detailed information about this asset.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-[#212121]">
                {asset.name}
              </h3>
              <p className="text-sm text-[#757575]">{asset.id}</p>
            </div>
            <Badge variant="outline" className={getStatusColor(asset.status)}>
              {asset.status}
            </Badge>
          </div>

          <Separator className="bg-[#e0e0e0]" />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Type</p>
              <p className="text-[#424242]">{asset.type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Facility</p>
              <p className="text-[#424242]">{asset.facility}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Condition</p>
              <Badge
                variant="outline"
                className={getConditionColor(asset.condition)}
              >
                {asset.condition}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Value</p>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-[#757575]" />
                <p className="text-[#424242]">{asset.value}</p>
              </div>
            </div>
          </div>

          <Separator className="bg-[#e0e0e0]" />

          <div className="space-y-4">
            <h4 className="font-medium text-[#424242]">
              Maintenance Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">
                  Last Maintenance
                </p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">{asset.lastMaintenance}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">
                  Next Maintenance
                </p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">{asset.nextMaintenance}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-[#424242]">Additional Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">
                  Purchase Date
                </p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">{asset.purchaseDate}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">
                  Warranty Expiration
                </p>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">
                    {asset.warrantyExpiration || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">
                  Manufacturer
                </p>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">
                    {asset.manufacturer || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">Model</p>
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">
                    {asset.model || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Description</p>
              <p className="text-[#424242] text-sm">
                {asset.description ||
                  "No additional description provided for this asset."}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
          >
            Close
          </Button>
          <Button className="bg-[#1976d2] hover:bg-[#1565c0]">
            <Wrench className="mr-2 h-4 w-4" /> Schedule Maintenance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
