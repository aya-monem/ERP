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
import {
  Calendar,
  DollarSign,
  Tag,
  MapPin,
  Package,
  RefreshCw,
} from "lucide-react";
import { InventoryItem } from "../Inventory";

interface ViewInventoryItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
  onRestock?: (item: InventoryItem) => void;
}

export default function ViewInventoryItemModal({
  open,
  onOpenChange,
  item,
  onRestock,
}: ViewInventoryItemModalProps) {
  if (!item) return null;

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Low Stock":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Out of Stock":
        return "bg-[#ffebee] text-[#f44336] border-[#f44336]";
      case "On Order":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Inventory Item Details
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            View detailed information about this inventory item.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-[#212121]">
                {item.name}
              </h3>
              <p className="text-sm text-[#757575]">{item.id}</p>
            </div>
            <Badge variant="outline" className={getStatusColor(item.status)}>
              {item.status}
            </Badge>
          </div>

          <Separator className="bg-[#e0e0e0]" />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Category</p>
              <p className="text-[#424242]">{item.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Supplier</p>
              <p className="text-[#424242]">{item.supplier}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Location</p>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-[#757575]" />
                <p className="text-[#424242]">{item.location}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-[#757575]">Part Number</p>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1 text-[#757575]" />
                <p className="text-[#424242]">{item.partNumber || "N/A"}</p>
              </div>
            </div>
          </div>

          <Separator className="bg-[#e0e0e0]" />

          <div className="space-y-4">
            <h4 className="font-medium text-[#424242]">Stock Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">
                  Current Quantity
                </p>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">
                    {item.quantity} {item.unit}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">
                  Minimum Quantity
                </p>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">
                    {item.minQuantity} {item.unit}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">
                  Last Restocked
                </p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">{item.lastRestocked}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#757575]">Unit Cost</p>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-[#757575]" />
                  <p className="text-[#424242]">{item.unitCost || "N/A"}</p>
                </div>
              </div>
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
          {(item.status === "Low Stock" || item.status === "Out of Stock") &&
            onRestock && (
              <Button
                className="bg-[#1976d2] hover:bg-[#1565c0]"
                onClick={() => {
                  onRestock(item);
                  onOpenChange(false);
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Restock Item
              </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
