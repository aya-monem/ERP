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
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import { InventoryItem } from "../Inventory";

interface EditInventoryItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
  onUpdateItem?: (updatedItem: InventoryItem) => void;
}

export default function EditInventoryItemModal({
  open,
  onOpenChange,
  item,
  onUpdateItem,
}: EditInventoryItemModalProps) {
  const [itemData, setItemData] = useState({
    name: "",
    category: "",
    location: "",
    quantity: "",
    minQuantity: "",
    unit: "pcs",
    lastRestocked: new Date(),
    supplier: "",
    partNumber: "",
    unitCost: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item && open) {
      setItemData({
        name: item.name || "",
        category: item.category || "",
        location: item.location || "",
        quantity: item.quantity?.toString() || "0",
        minQuantity: item.minQuantity?.toString() || "0",
        unit: item.unit || "pcs",
        lastRestocked: item.lastRestocked
          ? new Date(item.lastRestocked)
          : new Date(),
        supplier: item.supplier || "",
        partNumber: item.partNumber || "",
        unitCost: item.unitCost?.replace(/[^0-9.]/g, "") || "",
        description: "", // Add description if your inventory items have it
      });
    }
  }, [item, open]);

  const handleChange = (field: string, value: any) => {
    setItemData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!item) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onUpdateItem) {
        const quantity = parseInt(itemData.quantity);
        const minQuantity = parseInt(itemData.minQuantity);

        // Determine status based on quantity
        let status: InventoryItem["status"];
        if (quantity === 0) status = "Out of Stock";
        else if (quantity < minQuantity) status = "Low Stock";
        else status = "In Stock";

        // If the original status was "On Order" and quantity is still low, keep it as "On Order"
        if (item.status === "On Order" && quantity < minQuantity) {
          status = "On Order";
        }

        const updatedItem: InventoryItem = {
          ...item,
          name: itemData.name,
          category: itemData.category,
          location: itemData.location,
          quantity: quantity,
          minQuantity: minQuantity,
          unit: itemData.unit,
          lastRestocked: format(itemData.lastRestocked, "yyyy-MM-dd"),
          supplier: itemData.supplier,
          status: status,
          partNumber: itemData.partNumber,
          unitCost: itemData.unitCost ? `$${itemData.unitCost}` : item.unitCost,
        };

        onUpdateItem(updatedItem);
      }
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Edit Inventory Item
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Update the details of {item.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#424242]">
              Item Name <span className="text-[#f44336]">*</span>
            </Label>
            <Input
              id="name"
              value={itemData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#424242]">
                Category <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={itemData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maintenance Supplies">
                    Maintenance Supplies
                  </SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Janitorial">Janitorial</SelectItem>
                  <SelectItem value="Office Supplies">
                    Office Supplies
                  </SelectItem>
                  <SelectItem value="Safety Equipment">
                    Safety Equipment
                  </SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-[#424242]">
                Storage Location <span className="text-[#f44336]">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#9e9e9e]" />
                <Input
                  id="location"
                  value={itemData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Main Building - Storage Room B"
                  className="pl-10 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-[#424242]">
                Quantity <span className="text-[#f44336]">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                value={itemData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minQuantity" className="text-[#424242]">
                Min Quantity
              </Label>
              <Input
                id="minQuantity"
                type="number"
                value={itemData.minQuantity}
                onChange={(e) => handleChange("minQuantity", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit" className="text-[#424242]">
                Unit
              </Label>
              <Select
                value={itemData.unit}
                onValueChange={(value) => handleChange("unit", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pcs">Pieces</SelectItem>
                  <SelectItem value="boxes">Boxes</SelectItem>
                  <SelectItem value="pairs">Pairs</SelectItem>
                  <SelectItem value="sets">Sets</SelectItem>
                  <SelectItem value="gallons">Gallons</SelectItem>
                  <SelectItem value="liters">Liters</SelectItem>
                  <SelectItem value="reams">Reams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastRestocked" className="text-[#424242]">
                Last Restocked Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {itemData.lastRestocked ? (
                      format(itemData.lastRestocked, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={itemData.lastRestocked}
                    onSelect={(date) => handleChange("lastRestocked", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier" className="text-[#424242]">
                Supplier
              </Label>
              <Input
                id="supplier"
                value={itemData.supplier}
                onChange={(e) => handleChange("supplier", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partNumber" className="text-[#424242]">
                Part Number / SKU
              </Label>
              <Input
                id="partNumber"
                value={itemData.partNumber}
                onChange={(e) => handleChange("partNumber", e.target.value)}
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitCost" className="text-[#424242]">
                Unit Cost
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#757575]">
                  $
                </span>
                <Input
                  id="unitCost"
                  value={itemData.unitCost}
                  onChange={(e) => handleChange("unitCost", e.target.value)}
                  className="pl-6 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                />
              </div>
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
              !itemData.name ||
              !itemData.category ||
              !itemData.location ||
              !itemData.quantity
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
