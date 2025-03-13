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
import { Calendar as CalendarIcon, Upload } from "lucide-react";

interface AddInventoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddInventory?: (inventoryData: any) => void;
}

export default function AddInventoryModal({
  open,
  onOpenChange,
  onAddInventory,
}: AddInventoryModalProps) {
  const [inventoryData, setInventoryData] = useState({
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

  const handleChange = (field: string, value: any) => {
    setInventoryData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onAddInventory) {
        onAddInventory(inventoryData);
      }
      setIsSubmitting(false);
      onOpenChange(false);

      // Reset form
      setInventoryData({
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
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Add Inventory Item
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Fill in the details to add a new inventory item.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#424242]">
              Item Name <span className="text-[#f44336]">*</span>
            </Label>
            <Input
              id="name"
              value={inventoryData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Air Filters (HVAC)"
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
                value={inventoryData.category}
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
              <Input
                id="location"
                value={inventoryData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Main Building - Storage Room B"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                required
              />
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
                value={inventoryData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                placeholder="15"
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
                value={inventoryData.minQuantity}
                onChange={(e) => handleChange("minQuantity", e.target.value)}
                placeholder="5"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit" className="text-[#424242]">
                Unit
              </Label>
              <Select
                value={inventoryData.unit}
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
                    {inventoryData.lastRestocked ? (
                      format(inventoryData.lastRestocked, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={inventoryData.lastRestocked}
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
                value={inventoryData.supplier}
                onChange={(e) => handleChange("supplier", e.target.value)}
                placeholder="HVAC Supplies Inc."
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
                value={inventoryData.partNumber}
                onChange={(e) => handleChange("partNumber", e.target.value)}
                placeholder="AF-2023-H"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitCost" className="text-[#424242]">
                Unit Cost
              </Label>
              <Input
                id="unitCost"
                value={inventoryData.unitCost}
                onChange={(e) => handleChange("unitCost", e.target.value)}
                placeholder="$12.99"
                className="border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#424242]">
              Description
            </Label>
            <Textarea
              id="description"
              value={inventoryData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter item description and additional details"
              className="min-h-[100px] border-[#e0e0e0] focus-visible:ring-[#1976d2]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#424242]">Item Image</Label>
            <div className="border-2 border-dashed border-[#e0e0e0] rounded-md p-6 flex flex-col items-center justify-center hover:border-[#1976d2] transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-[#9e9e9e] mb-2" />
              <p className="text-sm text-[#616161] font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[#9e9e9e] mt-1">
                SVG, PNG, JPG (max. 2MB)
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
              !inventoryData.name ||
              !inventoryData.category ||
              !inventoryData.location ||
              !inventoryData.quantity
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              "Save Item"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
