import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkOrder } from "./WorkOrders";

interface WorkOrdersTableProps {
  className?: string;
  workOrders: WorkOrder[];
  searchQuery?: string;
  priorityFilter?: string;
  facilityFilter?: string;
  activeTab?: string;
  onViewDetails?: (workOrder: WorkOrder) => void;
  onEdit?: (workOrder: WorkOrder) => void;
  onReschedule?: (workOrder: WorkOrder) => void;
  onMarkComplete?: (workOrder: WorkOrder) => void;
  onDelete?: (workOrderId: string) => void;
}

export function WorkOrdersTable({
  className,
  workOrders = [],
  searchQuery = "",
  priorityFilter = "all",
  facilityFilter = "all",
  activeTab = "all",
  onViewDetails,
  onEdit,
  onReschedule,
  onMarkComplete,
  onDelete,
}: WorkOrdersTableProps) {
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

  // Filter work orders based on active tab, search query, and dropdown filters
  const filteredWorkOrders = workOrders.filter((order) => {
    // Filter by tab
    if (activeTab !== "all") {
      const statusMap: Record<string, string> = {
        open: "Open",
        "in-progress": "In Progress",
        "on-hold": "On Hold",
        completed: "Completed",
      };
      if (order.status !== statusMap[activeTab]) return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !order.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by priority
    if (
      priorityFilter !== "all" &&
      order.priority.toLowerCase() !== priorityFilter
    ) {
      return false;
    }

    // Filter by facility
    if (facilityFilter !== "all") {
      const facilityMap: Record<string, string> = {
        main: "Main Building",
        warehouse: "Warehouse",
        office: "Office Building",
      };
      if (order.facility !== facilityMap[facilityFilter]) {
        return false;
      }
    }

    return true;
  });

  const isDueDatePast = (dueDate: string, status: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && status !== "Completed";
  };

  return (
    <div
      className={`bg-white rounded-lg border border-[#e0e0e0] shadow-sm ${className}`}
    >
      <div className="p-4 border-b border-[#e0e0e0]">
        <h3 className="text-lg font-medium text-[#212121]">Work Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#f5f5f5]">
            <TableRow>
              <TableHead className="text-[#616161]">ID</TableHead>
              <TableHead className="text-[#616161]">Title</TableHead>
              <TableHead className="text-[#616161]">Facility</TableHead>
              <TableHead className="text-[#616161]">Priority</TableHead>
              <TableHead className="text-[#616161]">Status</TableHead>
              <TableHead className="text-[#616161]">Assigned To</TableHead>
              <TableHead className="text-[#616161]">Due Date</TableHead>
              <TableHead className="text-right text-[#616161]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkOrders.length > 0 ? (
              filteredWorkOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-[#fafafa]">
                  <TableCell className="font-medium text-[#212121]">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-[#424242]">
                    {order.title}
                  </TableCell>
                  <TableCell className="text-[#424242]">
                    {order.facility}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getPriorityColor(order.priority)}
                    >
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#424242]">
                    {order.assignedTo || "Unassigned"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span
                        className={`text-[#424242] ${isDueDatePast(order.dueDate, order.status) ? "text-[#f44336]" : ""}`}
                      >
                        {order.dueDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#757575] hover:bg-[#f5f5f5] hover:text-[#424242]"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-[#e0e0e0]"
                      >
                        <DropdownMenuItem
                          className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2] cursor-pointer"
                          onClick={() => onViewDetails && onViewDetails(order)}
                        >
                          <Eye className="mr-2 h-4 w-4 text-[#1976d2]" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#4caf50] cursor-pointer"
                          onClick={() => onEdit && onEdit(order)}
                        >
                          <Edit className="mr-2 h-4 w-4 text-[#4caf50]" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#ff9800] cursor-pointer"
                          onClick={() => onReschedule && onReschedule(order)}
                        >
                          <Calendar className="mr-2 h-4 w-4 text-[#ff9800]" />
                          Reschedule
                        </DropdownMenuItem>
                        {order.status !== "Completed" && (
                          <DropdownMenuItem
                            className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#4caf50] cursor-pointer"
                            onClick={() =>
                              onMarkComplete && onMarkComplete(order)
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4 text-[#4caf50]" />
                            Mark Complete
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-[#f44336] focus:bg-[#ffebee] focus:text-[#d32f2f] cursor-pointer"
                          onClick={() => onDelete && onDelete(order.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-[#757575]"
                >
                  No work orders found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default WorkOrdersTable;
