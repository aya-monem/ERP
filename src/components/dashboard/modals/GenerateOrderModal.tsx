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
import {
  Calendar as CalendarIcon,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface GenerateOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateOrder?: (orderData: any) => void;
  lowStockItems?: any[];
}

export default function GenerateOrderModal({
  open,
  onOpenChange,
  onGenerateOrder,
  lowStockItems = [],
}: GenerateOrderModalProps) {
  const [orderData, setOrderData] = useState({
    supplier: "",
    expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    notes: "",
    priority: "Normal",
    items: lowStockItems.map((item) => ({
      ...item,
      selected: true,
      orderQuantity:
        item.minQuantity - item.quantity > 0
          ? item.minQuantity - item.quantity
          : 5,
    })),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    setOrderData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (onGenerateOrder) {
        const selectedItems = orderData.items.filter((item) => item.selected);
        onGenerateOrder({
          ...orderData,
          items: selectedItems,
          orderDate: new Date().toISOString().split("T")[0],
          orderNumber: `PO-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
        });
      }
      setIsSubmitting(false);
      onOpenChange(false);

      // Reset form
      setOrderData({
        supplier: "",
        expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notes: "",
        priority: "Normal",
        items: lowStockItems.map((item) => ({
          ...item,
          selected: true,
          orderQuantity:
            item.minQuantity - item.quantity > 0
              ? item.minQuantity - item.quantity
              : 5,
        })),
      });
    }, 1000);
  };

  const totalItems = orderData.items.filter((item) => item.selected).length;
  const estimatedTotal = orderData.items
    .filter((item) => item.selected)
    .reduce((sum, item) => {
      const unitCost = parseFloat(
        item.unitCost?.replace(/[^0-9.]/g, "") || "0",
      );
      return sum + unitCost * item.orderQuantity;
    }, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            <div className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Generate Purchase Order
            </div>
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Create a purchase order for low stock inventory items.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier" className="text-[#424242]">
                Supplier <span className="text-[#f44336]">*</span>
              </Label>
              <Select
                value={orderData.supplier}
                onValueChange={(value) => handleChange("supplier", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HVAC Supplies Inc.">
                    HVAC Supplies Inc.
                  </SelectItem>
                  <SelectItem value="Electrical Depot">
                    Electrical Depot
                  </SelectItem>
                  <SelectItem value="CleanPro Supplies">
                    CleanPro Supplies
                  </SelectItem>
                  <SelectItem value="Office Essentials">
                    Office Essentials
                  </SelectItem>
                  <SelectItem value="SafetyFirst Inc.">
                    SafetyFirst Inc.
                  </SelectItem>
                  <SelectItem value="Plumbing Plus">Plumbing Plus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedDelivery" className="text-[#424242]">
                Expected Delivery Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                    {orderData.expectedDelivery ? (
                      format(orderData.expectedDelivery, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={orderData.expectedDelivery}
                    onSelect={(date) => handleChange("expectedDelivery", date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-[#424242]">
                Priority
              </Label>
              <Select
                value={orderData.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-[#424242] text-lg font-medium">
                Order Items
              </Label>
              <div className="text-sm text-[#757575]">
                {totalItems} items selected
              </div>
            </div>

            {orderData.items.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#f5f5f5] border-b border-[#e0e0e0]">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[#616161] w-[40px]"></th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[#616161]">
                        Item
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[#616161]">
                        Current Stock
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[#616161]">
                        Min. Quantity
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[#616161]">
                        Order Quantity
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[#616161]">
                        Unit Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#e0e0e0] last:border-b-0"
                      >
                        <td className="px-4 py-3">
                          <Checkbox
                            checked={item.selected}
                            onCheckedChange={(checked) =>
                              handleItemChange(index, "selected", checked)
                            }
                            className="border-[#e0e0e0] data-[state=checked]:bg-[#1976d2] data-[state=checked]:border-[#1976d2]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-[#212121]">
                            {item.name}
                          </div>
                          <div className="text-xs text-[#757575]">
                            {item.id}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span
                              className={
                                item.quantity < item.minQuantity
                                  ? "text-[#f44336]"
                                  : "text-[#424242]"
                              }
                            >
                              {item.quantity} {item.unit}
                            </span>
                            {item.quantity < item.minQuantity && (
                              <AlertTriangle className="ml-2 h-4 w-4 text-[#f44336]" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#424242]">
                          {item.minQuantity} {item.unit}
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            type="number"
                            min="1"
                            value={item.orderQuantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "orderQuantity",
                                parseInt(e.target.value) || 1,
                              )
                            }
                            className="w-20 h-8 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                            disabled={!item.selected}
                          />
                        </td>
                        <td className="px-4 py-3 text-[#424242]">
                          {item.unitCost || "$0.00"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center text-[#757575]">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-[#ff9800]" />
                <p>No low stock items found.</p>
                <p className="text-sm mt-1">
                  All inventory items are at adequate levels.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-[#424242]">
              Order Notes
            </Label>
            <Textarea
              id="notes"
              value={orderData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add any special instructions or notes for this order"
              className="min-h-[80px] border-[#e0e0e0] focus-visible:ring-[#1976d2]"
            />
          </div>

          <div className="bg-[#f5f5f5] p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#424242]">Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium text-[#424242]">
                Estimated Total:
              </span>
              <span className="font-bold text-[#1976d2]">
                ${estimatedTotal.toFixed(2)}
              </span>
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
              !orderData.supplier ||
              !orderData.items.some((item) => item.selected)
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Generating...
              </>
            ) : (
              "Generate Purchase Order"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
