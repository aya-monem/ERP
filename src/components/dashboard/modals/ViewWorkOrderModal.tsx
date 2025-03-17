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
import { WorkOrder } from "../WorkOrders";

interface ViewWorkOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workOrder: WorkOrder;
}

export default function ViewWorkOrderModal({
  open,
  onOpenChange,
  workOrder,
}: ViewWorkOrderModalProps) {
  const getPriorityColor = (priority: WorkOrder["priority"]) => {
    switch (priority) {
      case "Low":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      case "Medium":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "High":
        return "bg-[#fff8e1] text-[#ffa000] border-[#ffa000]";
      case "Critical":
        return "bg-[#ffebee] text-[#f44336] border-[#f44336]";
      default:
        return "";
    }
  };

  const getStatusColor = (status: WorkOrder["status"]) => {
    switch (status) {
      case "Open":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      case "In Progress":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "On Hold":
        return "bg-[#f3e5f5] text-[#9c27b0] border-[#9c27b0]";
      case "Completed":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#212121]">
            Work Order Details
          </DialogTitle>
          <DialogDescription className="text-[#616161]">
            View detailed information about this work order.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-[#757575] mb-1">ID</h3>
              <p className="text-[#212121] font-medium">{workOrder.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#757575] mb-1">
                Status
              </h3>
              <Badge
                variant="outline"
                className={getStatusColor(workOrder.status)}
              >
                {workOrder.status}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#757575] mb-1">Title</h3>
            <p className="text-[#212121]">{workOrder.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-[#757575] mb-1">
                Facility
              </h3>
              <p className="text-[#212121]">{workOrder.facility}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#757575] mb-1">
                Priority
              </h3>
              <Badge
                variant="outline"
                className={getPriorityColor(workOrder.priority)}
              >
                {workOrder.priority}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-[#757575] mb-1">
                Assigned To
              </h3>
              <p className="text-[#212121]">
                {workOrder.assignedTo || "Unassigned"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#757575] mb-1">
                Due Date
              </h3>
              <p className="text-[#212121]">{workOrder.dueDate}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
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
