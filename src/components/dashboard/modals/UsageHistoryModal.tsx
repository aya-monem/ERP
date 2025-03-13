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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, User, Package, FileText } from "lucide-react";
import { InventoryItem } from "../Inventory";

interface UsageHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
}

export default function UsageHistoryModal({
  open,
  onOpenChange,
  item,
}: UsageHistoryModalProps) {
  if (!item) return null;

  // Mock usage history data
  const usageHistory = [
    {
      id: "USG-1001",
      date: "2023-06-05",
      quantity: 5,
      user: "Mike Johnson",
      workOrder: "WO-1001",
      notes: "Used for HVAC repair on 3rd floor",
    },
    {
      id: "USG-1002",
      date: "2023-05-22",
      quantity: 3,
      user: "Sarah Williams",
      workOrder: "WO-1002",
      notes: "Regular maintenance",
    },
    {
      id: "USG-1003",
      date: "2023-05-15",
      quantity: 8,
      user: "Robert Davis",
      workOrder: "WO-1003",
      notes: "Emergency repair",
    },
    {
      id: "USG-1004",
      date: "2023-04-30",
      quantity: 2,
      user: "Jennifer Lee",
      workOrder: "WO-1004",
      notes: "Scheduled maintenance",
    },
    {
      id: "USG-1005",
      date: "2023-04-18",
      quantity: 4,
      user: "Mike Johnson",
      workOrder: "WO-1005",
      notes: "Replacement of worn components",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Usage History
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            View usage history for {item.name} ({item.id}).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 bg-[#f5f5f5] p-4 rounded-md">
            <div>
              <p className="text-sm font-medium text-[#757575]">Item</p>
              <p className="font-medium text-[#212121]">{item.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#757575]">Category</p>
              <p className="text-[#424242]">{item.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#757575]">
                Current Stock
              </p>
              <p className="text-[#424242]">
                {item.quantity} {item.unit}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#757575]">Status</p>
              <Badge
                variant="outline"
                className={
                  item.status === "In Stock"
                    ? "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]"
                    : item.status === "Low Stock"
                      ? "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]"
                      : item.status === "Out of Stock"
                        ? "bg-[#ffebee] text-[#f44336] border-[#f44336]"
                        : "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]"
                }
              >
                {item.status}
              </Badge>
            </div>
          </div>

          <div className="rounded-md border border-[#e0e0e0] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#f5f5f5]">
                <TableRow>
                  <TableHead className="text-[#616161]">ID</TableHead>
                  <TableHead className="text-[#616161]">Date</TableHead>
                  <TableHead className="text-[#616161]">Quantity</TableHead>
                  <TableHead className="text-[#616161]">User</TableHead>
                  <TableHead className="text-[#616161]">Work Order</TableHead>
                  <TableHead className="text-[#616161]">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageHistory.map((record) => (
                  <TableRow key={record.id} className="hover:bg-[#fafafa]">
                    <TableCell className="font-medium text-[#212121]">
                      {record.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-[#757575]" />
                        <span className="text-[#424242]">{record.date}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1 text-[#757575]" />
                        <span className="text-[#424242]">
                          {record.quantity} {item.unit}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-[#757575]" />
                        <span className="text-[#424242]">{record.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#424242]">
                      {record.workOrder}
                    </TableCell>
                    <TableCell className="text-[#424242]">
                      {record.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-[#f5f5f5] p-4 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-[#757575]">
                  Total Records
                </p>
                <p className="font-medium text-[#212121]">
                  {usageHistory.length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">
                  Total Quantity Used
                </p>
                <p className="font-medium text-[#212121]">
                  {usageHistory.reduce(
                    (sum, record) => sum + record.quantity,
                    0,
                  )}{" "}
                  {item.unit}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">Last Usage</p>
                <p className="font-medium text-[#212121]">
                  {usageHistory[0]?.date || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
          >
            <FileText className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
