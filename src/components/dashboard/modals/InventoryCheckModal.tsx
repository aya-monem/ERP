import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, ShoppingCart } from "lucide-react";
import { InventoryItem } from "../Inventory";

interface InventoryCheckModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: (requiredItems: any[]) => void;
  onGenerateOrder: () => void;
  assetType: string;
  inventoryItems: InventoryItem[];
}

export default function InventoryCheckModal({
  open,
  onOpenChange,
  onProceed,
  onGenerateOrder,
  assetType,
  inventoryItems,
}: InventoryCheckModalProps) {
  const [requiredItems, setRequiredItems] = useState<any[]>([]);
  const [isChecking, setIsChecking] = useState(true);
  const [hasLowStock, setHasLowStock] = useState(false);

  // Filter inventory items based on asset type
  useEffect(() => {
    if (open) {
      setIsChecking(true);

      // Simulate inventory check process
      setTimeout(() => {
        // For a printer, we might need toner, paper, etc.
        let items = [];
        let hasLow = false;

        if (assetType.toLowerCase().includes("printer")) {
          // Find relevant inventory items
          const tonerItems = inventoryItems.filter(
            (item) =>
              item.name.toLowerCase().includes("toner") ||
              item.name.toLowerCase().includes("ink"),
          );

          const paperItems = inventoryItems.filter((item) =>
            item.name.toLowerCase().includes("paper"),
          );

          const printerParts = inventoryItems.filter(
            (item) =>
              item.category.toLowerCase().includes("it") &&
              !tonerItems.includes(item) &&
              !paperItems.includes(item),
          );

          items = [...tonerItems, ...paperItems, ...printerParts];
        } else {
          // For other asset types, just get items from the same category
          items = inventoryItems.filter((item) =>
            item.category.toLowerCase().includes(assetType.toLowerCase()),
          );
        }

        // Check if any items are low in stock
        items.forEach((item) => {
          if (item.status === "Low Stock" || item.status === "Out of Stock") {
            hasLow = true;
          }
        });

        setRequiredItems(items);
        setHasLowStock(hasLow);
        setIsChecking(false);
      }, 1500);
    }
  }, [open, assetType, inventoryItems]);

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

  const getStockPercentage = (quantity: number, minQuantity: number) => {
    const percentage = (quantity / minQuantity) * 100;
    return Math.min(percentage, 100);
  };

  const getProgressColor = (quantity: number, minQuantity: number) => {
    const ratio = quantity / minQuantity;
    if (ratio === 0) return "bg-[#f44336]";
    if (ratio < 1) return "bg-[#ff9800]";
    return "bg-[#4caf50]";
  };

  const handleProceed = () => {
    onProceed(requiredItems);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Inventory Check
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Checking inventory for required parts and supplies...
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isChecking ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e0e0e0] border-t-[#1976d2]"></div>
              <p className="mt-4 text-[#616161]">
                Checking inventory for required parts...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {hasLowStock ? (
                    <>
                      <AlertTriangle className="h-5 w-5 text-[#ff9800] mr-2" />
                      <span className="font-medium text-[#616161]">
                        Some required items are low in stock or unavailable
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 text-[#4caf50] mr-2" />
                      <span className="font-medium text-[#616161]">
                        All required items are available in inventory
                      </span>
                    </>
                  )}
                </div>
                {hasLowStock && (
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

              <div className="border rounded-md">
                <Table>
                  <TableHeader className="bg-[#f5f5f5]">
                    <TableRow>
                      <TableHead className="text-[#616161]">
                        Item Name
                      </TableHead>
                      <TableHead className="text-[#616161]">Category</TableHead>
                      <TableHead className="text-[#616161]">Quantity</TableHead>
                      <TableHead className="text-[#616161]">
                        Stock Level
                      </TableHead>
                      <TableHead className="text-[#616161]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requiredItems.length > 0 ? (
                      requiredItems.map((item) => (
                        <TableRow key={item.id} className="hover:bg-[#fafafa]">
                          <TableCell className="font-medium text-[#424242]">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-[#424242]">
                            {item.category}
                          </TableCell>
                          <TableCell>
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
                          </TableCell>
                          <TableCell className="w-[180px]">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={getStockPercentage(
                                  item.quantity,
                                  item.minQuantity,
                                )}
                                className={`h-2 ${getProgressColor(
                                  item.quantity,
                                  item.minQuantity,
                                )}`}
                              />
                              <span className="text-xs w-[40px] text-right">
                                {Math.round(
                                  (item.quantity / item.minQuantity) * 100,
                                )}
                                %
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusColor(item.status)}
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-24 text-center text-[#757575]"
                        >
                          No relevant inventory items found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
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
            onClick={handleProceed}
            className="bg-[#1976d2] hover:bg-[#1565c0]"
            disabled={isChecking}
          >
            Proceed to Work Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
