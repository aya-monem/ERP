import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Scan, ShoppingCart } from "lucide-react";
import { InventoryItem } from "../Inventory";

interface InventoryUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateInventory: (updatedItems: any[]) => void;
  onGenerateOrder: () => void;
  inventoryItems: InventoryItem[];
  workOrderId: string;
}

export default function InventoryUpdateModal({
  open,
  onOpenChange,
  onUpdateInventory,
  onGenerateOrder,
  inventoryItems,
  workOrderId,
}: InventoryUpdateModalProps) {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState("");

  // Filter to only show relevant inventory items
  const relevantItems = inventoryItems.filter(
    (item) => item.status !== "Decommissioned",
  );

  const handleItemSelection = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => {
      const newSelection = { ...prev };

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        delete newSelection[itemId];
      } else {
        // Add or update item
        newSelection[itemId] = quantity;
      }

      return newSelection;
    });
  };

  const incrementQuantity = (
    itemId: string,
    currentQuantity: number,
    max: number,
  ) => {
    const newQuantity = Math.min((selectedItems[itemId] || 0) + 1, max);
    handleItemSelection(itemId, newQuantity);
  };

  const decrementQuantity = (itemId: string) => {
    const currentQuantity = selectedItems[itemId] || 0;
    if (currentQuantity > 0) {
      handleItemSelection(itemId, currentQuantity - 1);
    }
  };

  const handleQuantityChange = (itemId: string, value: string, max: number) => {
    const quantity = parseInt(value) || 0;
    handleItemSelection(itemId, Math.min(quantity, max));
  };

  const simulateBarcodeScan = () => {
    setShowScanner(true);

    // Simulate scanning process
    setTimeout(() => {
      // Randomly select an item from inventory
      const randomIndex = Math.floor(Math.random() * relevantItems.length);
      const scannedItem = relevantItems[randomIndex];

      if (scannedItem) {
        setScanResult(`Scanned: ${scannedItem.name} (${scannedItem.id})`);

        // Auto-select the scanned item
        const currentQuantity = selectedItems[scannedItem.id] || 0;
        handleItemSelection(scannedItem.id, currentQuantity + 1);

        // Reset scanner after 3 seconds
        setTimeout(() => {
          setShowScanner(false);
          setScanResult("");
        }, 3000);
      }
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Prepare updated inventory items
    const updatedItems = Object.entries(selectedItems)
      .map(([itemId, quantity]) => {
        const item = inventoryItems.find((i) => i.id === itemId);
        if (!item) return null;

        return {
          ...item,
          quantity: Math.max(0, item.quantity - quantity),
          status: determineStatus(
            Math.max(0, item.quantity - quantity),
            item.minQuantity,
          ),
          lastUsed: new Date().toISOString().split("T")[0],
          usageHistory: [
            {
              date: new Date().toISOString().split("T")[0],
              quantity: quantity,
              workOrderId: workOrderId,
            },
            ...(item.usageHistory || []),
          ],
        };
      })
      .filter(Boolean);

    // Simulate API call
    setTimeout(() => {
      onUpdateInventory(updatedItems as any[]);
      setIsSubmitting(false);
      onOpenChange(false);
      setSelectedItems({});
    }, 1000);
  };

  const determineStatus = (
    quantity: number,
    minQuantity: number,
  ): InventoryItem["status"] => {
    if (quantity === 0) return "Out of Stock";
    if (quantity < minQuantity) return "Low Stock";
    return "In Stock";
  };

  const getStatusColor = (status: string) => {
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

  const hasLowStockItems = relevantItems.some(
    (item) => item.status === "Low Stock" || item.status === "Out of Stock",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Update Inventory
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Select parts and supplies used for this work order.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#424242]">
                Available Items
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
                  onClick={simulateBarcodeScan}
                >
                  <Scan className="mr-2 h-4 w-4" />
                  Scan Barcode
                </Button>
                {hasLowStockItems && (
                  <Button
                    variant="outline"
                    className="border-[#ff9800] text-[#ff9800] hover:bg-[#fff8e1] hover:text-[#ff9800]"
                    onClick={onGenerateOrder}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Generate Order
                  </Button>
                )}
              </div>
            </div>

            {showScanner && (
              <div className="border-2 border-dashed border-[#1976d2] rounded-md p-4 bg-[#e3f2fd] text-center">
                <div className="animate-pulse mb-2">
                  <Scan className="h-8 w-8 text-[#1976d2] mx-auto" />
                </div>
                <p className="text-[#1976d2] font-medium">
                  {scanResult || "Scanning barcode..."}
                </p>
              </div>
            )}

            <div className="border rounded-md">
              <Table>
                <TableHeader className="bg-[#f5f5f5]">
                  <TableRow>
                    <TableHead className="text-[#616161]">Item Name</TableHead>
                    <TableHead className="text-[#616161]">Category</TableHead>
                    <TableHead className="text-[#616161]">Available</TableHead>
                    <TableHead className="text-[#616161]">Status</TableHead>
                    <TableHead className="text-[#616161]">
                      Quantity Used
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relevantItems.length > 0 ? (
                    relevantItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-[#fafafa]">
                        <TableCell className="font-medium text-[#424242]">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {item.category}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(item.status)}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-[#e0e0e0] text-[#616161]"
                              onClick={() => decrementQuantity(item.id)}
                              disabled={!selectedItems[item.id]}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min="0"
                              max={item.quantity}
                              value={selectedItems[item.id] || 0}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  e.target.value,
                                  item.quantity,
                                )
                              }
                              className="w-16 text-center border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-[#e0e0e0] text-[#616161]"
                              onClick={() =>
                                incrementQuantity(
                                  item.id,
                                  selectedItems[item.id] || 0,
                                  item.quantity,
                                )
                              }
                              disabled={
                                (selectedItems[item.id] || 0) >= item.quantity
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-[#757575]"
                      >
                        No inventory items available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="bg-[#f5f5f5] p-4 rounded-md">
              <h4 className="font-medium text-[#424242] mb-2">
                Selected Items Summary
              </h4>
              <ul className="space-y-1">
                {Object.entries(selectedItems).length > 0 ? (
                  Object.entries(selectedItems).map(([itemId, quantity]) => {
                    const item = inventoryItems.find((i) => i.id === itemId);
                    if (!item || quantity <= 0) return null;
                    return (
                      <li key={itemId} className="text-[#616161]">
                        {item.name}: {quantity} {item.unit}
                      </li>
                    );
                  })
                ) : (
                  <li className="text-[#9e9e9e] italic">
                    No items selected yet
                  </li>
                )}
              </ul>
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
              isSubmitting || Object.entries(selectedItems).length === 0
            }
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Updating...
              </>
            ) : (
              "Update Inventory"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
