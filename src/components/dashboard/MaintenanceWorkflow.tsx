import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  RefreshCw,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  Package,
  Wrench,
  UserCheck,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MaintenanceRequestModal from "./modals/MaintenanceRequestModal";
import InventoryCheckModal from "./modals/InventoryCheckModal";
import TechnicianAssignmentModal from "./modals/TechnicianAssignmentModal";
import InventoryUpdateModal from "./modals/InventoryUpdateModal";
import AddWorkOrderModal from "./modals/AddWorkOrderModal";
import GenerateOrderModal from "./modals/GenerateOrderModal";
import { InventoryItem } from "./Inventory";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  assetId: string;
  assetName: string;
  requestType: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "New" | "In Progress" | "Completed" | "Cancelled";
  requestedBy: string;
  requestDate: string;
  location: string;
  workOrderId?: string;
}

interface WorkOrder {
  id: string;
  title: string;
  description: string;
  assetId: string;
  assetName: string;
  facility: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "On Hold" | "Completed";
  assignedTo: string;
  dueDate: string;
  requestId?: string;
  inventoryChecked?: boolean;
  technicianAssigned?: boolean;
  inventoryUpdated?: boolean;
  completionNotes?: string;
}

export default function MaintenanceWorkflow() {
  // This component will be used directly in the route
  const navigate = useNavigate();
  const location = useLocation();

  // State for maintenance requests
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    MaintenanceRequest[]
  >([
    {
      id: "REQ-1001",
      title: "Broken Office Printer",
      description:
        "The printer on the 2nd floor is not printing properly. Paper jams frequently.",
      assetId: "AST-1002",
      assetName: "Office Printer - IT Room",
      requestType: "Repair",
      priority: "Medium",
      status: "New",
      requestedBy: "Jane Smith",
      requestDate: "2023-06-10",
      location: "Admin Building - 2nd Floor",
    },
    {
      id: "REQ-1002",
      title: "HVAC Not Cooling",
      description:
        "The air conditioning in the west wing is not cooling properly.",
      assetId: "AST-1001",
      assetName: "HVAC System - 3rd Floor",
      requestType: "Repair",
      priority: "High",
      status: "In Progress",
      requestedBy: "Michael Brown",
      requestDate: "2023-06-08",
      location: "Main Building - West Wing",
      workOrderId: "WO-1001",
    },
  ]);

  // State for work orders
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: "WO-1001",
      title: "HVAC Repair - West Wing",
      description:
        "Repair the air conditioning system in the west wing that is not cooling properly.",
      assetId: "AST-1001",
      assetName: "HVAC System - 3rd Floor",
      facility: "Main Building",
      priority: "High",
      status: "In Progress",
      assignedTo: "Mike Johnson",
      dueDate: "2023-06-15",
      requestId: "REQ-1002",
      inventoryChecked: true,
      technicianAssigned: true,
      inventoryUpdated: false,
    },
  ]);

  // State for assets (from Assets.tsx)
  const [assets, setAssets] = useState<any[]>([
    {
      id: "AST-1001",
      name: "HVAC System - 3rd Floor",
      type: "HVAC",
      facility: "Main Building",
      status: "Needs Maintenance",
      lastMaintenance: "2023-01-15",
      nextMaintenance: "2023-07-15",
    },
    {
      id: "AST-1002",
      name: "Office Printer - IT Room",
      type: "IT Equipment",
      facility: "Admin Building",
      status: "Operational",
      lastMaintenance: "2024-02-10",
      nextMaintenance: "2024-08-10",
    },
    {
      id: "AST-1003",
      name: "Backup Generator - Parking Lot",
      type: "Power Equipment",
      facility: "Utility Section",
      status: "Operational",
      lastMaintenance: "2023-11-01",
      nextMaintenance: "2024-05-01",
    },
  ]);

  // State for inventory items (from Inventory.tsx)
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: "INV-1001",
      name: "Air Filters (HVAC)",
      category: "Maintenance Supplies",
      location: "Main Building - Storage Room B",
      quantity: 15,
      minQuantity: 20,
      unit: "pcs",
      lastRestocked: "2023-05-10",
      supplier: "HVAC Supplies Inc.",
      status: "Low Stock",
      partNumber: "AF-2023-H",
      unitCost: "$12.99",
    },
    {
      id: "INV-1002",
      name: "Printer Toner Cartridges",
      category: "IT Supplies",
      location: "Admin Building - IT Storage",
      quantity: 5,
      minQuantity: 3,
      unit: "pcs",
      lastRestocked: "2024-02-15",
      supplier: "Office Supplies Co.",
      status: "In Stock",
      partNumber: "TC-HP-45A",
      unitCost: "$65.99",
    },
    {
      id: "INV-1003",
      name: "Printer Paper",
      category: "Office Supplies",
      location: "Admin Building - Supply Closet",
      quantity: 20,
      minQuantity: 10,
      unit: "reams",
      lastRestocked: "2024-03-01",
      supplier: "Office Supplies Co.",
      status: "In Stock",
      partNumber: "PP-A4-80",
      unitCost: "$4.99",
    },
    {
      id: "INV-1004",
      name: "Printer Fuser Assembly",
      category: "IT Equipment",
      location: "Admin Building - IT Storage",
      quantity: 1,
      minQuantity: 2,
      unit: "pcs",
      lastRestocked: "2024-01-20",
      supplier: "HP Parts Inc.",
      status: "Low Stock",
      partNumber: "FA-HP-4200",
      unitCost: "$149.99",
    },
  ]);

  // Modal states
  const [isMaintenanceRequestModalOpen, setIsMaintenanceRequestModalOpen] =
    useState(false);
  const [isInventoryCheckModalOpen, setIsInventoryCheckModalOpen] =
    useState(false);
  const [isTechnicianAssignmentModalOpen, setIsTechnicianAssignmentModalOpen] =
    useState(false);
  const [isInventoryUpdateModalOpen, setIsInventoryUpdateModalOpen] =
    useState(false);
  const [isAddWorkOrderModalOpen, setIsAddWorkOrderModalOpen] = useState(false);
  const [isGenerateOrderModalOpen, setIsGenerateOrderModalOpen] =
    useState(false);

  // Selected item states
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(
    null,
  );

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Check for request ID in location state when component mounts
  useEffect(() => {
    if (location.state && location.state.requestId) {
      const request = maintenanceRequests.find(
        (req) => req.id === location.state.requestId,
      );
      if (request) {
        setSelectedRequest(request);
        setIsMaintenanceRequestModalOpen(true);
      }
    }
  }, [location.state, maintenanceRequests]);

  // Handle maintenance request submission
  const handleSubmitRequest = (requestData: any) => {
    const newRequest: MaintenanceRequest = {
      id: `REQ-${1000 + maintenanceRequests.length + 1}`,
      title: requestData.title,
      description: requestData.description,
      assetId: requestData.assetId,
      assetName:
        assets.find((asset) => asset.id === requestData.assetId)?.name || "",
      requestType: requestData.requestType,
      priority: requestData.priority,
      status: "New",
      requestedBy: requestData.requestedBy,
      requestDate: requestData.requestDate
        ? requestData.requestDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      location: requestData.location,
    };

    setMaintenanceRequests([newRequest, ...maintenanceRequests]);
    setIsMaintenanceRequestModalOpen(false);
  };

  // Handle inventory check
  const handleInventoryCheck = (requiredItems: any[]) => {
    console.log("Inventory check called", requiredItems);
    if (!selectedRequest) return;

    // Create a work order from the maintenance request
    const newWorkOrder: WorkOrder = {
      id: `WO-${1000 + workOrders.length + 1}`,
      title: `${selectedRequest.requestType} - ${selectedRequest.assetName}`,
      description: selectedRequest.description,
      assetId: selectedRequest.assetId,
      assetName: selectedRequest.assetName,
      facility:
        assets.find((asset) => asset.id === selectedRequest.assetId)
          ?.facility || "",
      priority: selectedRequest.priority,
      status: "Open",
      assignedTo: "",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      requestId: selectedRequest.id,
      inventoryChecked: true,
      technicianAssigned: false,
      inventoryUpdated: false,
    };

    // Update the maintenance request status and link to work order
    const updatedRequests = maintenanceRequests.map((req) =>
      req.id === selectedRequest.id
        ? {
            ...req,
            status: "In Progress" as const,
            workOrderId: newWorkOrder.id,
          }
        : req,
    );

    setWorkOrders([newWorkOrder, ...workOrders]);
    setMaintenanceRequests(updatedRequests);
    setSelectedWorkOrder(newWorkOrder);

    // Open technician assignment modal
    setTimeout(() => {
      setIsTechnicianAssignmentModalOpen(true);
    }, 500);
  };

  // Handle technician assignment
  const handleTechnicianAssignment = (assignmentData: any) => {
    if (!selectedWorkOrder) return;

    // Update the work order with technician assignment
    const updatedWorkOrders = workOrders.map((order) =>
      order.id === selectedWorkOrder.id
        ? {
            ...order,
            assignedTo: assignmentData.technicianName,
            status: "In Progress" as const,
            technicianAssigned: true,
            dueDate: assignmentData.scheduledDate
              ? assignmentData.scheduledDate.toISOString().split("T")[0]
              : order.dueDate,
          }
        : order,
    );

    setWorkOrders(updatedWorkOrders);
    setSelectedWorkOrder({
      ...selectedWorkOrder,
      assignedTo: assignmentData.technicianName,
      status: "In Progress",
      technicianAssigned: true,
    });
  };

  // Handle inventory update after work completion
  const handleInventoryUpdate = (updatedItems: any[]) => {
    if (!selectedWorkOrder) return;

    // Update inventory items
    const newInventoryItems = [...inventoryItems];

    updatedItems.forEach((updatedItem) => {
      const index = newInventoryItems.findIndex(
        (item) => item.id === updatedItem.id,
      );
      if (index !== -1) {
        newInventoryItems[index] = updatedItem;
      }
    });

    // Update the work order
    const updatedWorkOrders = workOrders.map((order) =>
      order.id === selectedWorkOrder.id
        ? {
            ...order,
            inventoryUpdated: true,
            status: "Completed" as const,
          }
        : order,
    );

    // Update the asset status
    const updatedAssets = assets.map((asset) =>
      asset.id === selectedWorkOrder.assetId
        ? {
            ...asset,
            status: "Operational",
            lastMaintenance: new Date().toISOString().split("T")[0],
          }
        : asset,
    );

    // Update the maintenance request if it exists
    const updatedRequests = maintenanceRequests.map((req) =>
      req.id === selectedWorkOrder.requestId
        ? { ...req, status: "Completed" as const }
        : req,
    );

    setInventoryItems(newInventoryItems);
    setWorkOrders(updatedWorkOrders);
    setAssets(updatedAssets);
    setMaintenanceRequests(updatedRequests);
  };

  // Handle generate order for low stock items
  const handleGenerateOrder = (orderData: any) => {
    // Update inventory items that were ordered
    const updatedItems = [...inventoryItems];

    if (orderData && orderData.items) {
      orderData.items.forEach((orderedItem: any) => {
        const itemIndex = updatedItems.findIndex(
          (item) => item.id === orderedItem.id,
        );
        if (itemIndex !== -1) {
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            status: "On Order",
          };
        }
      });
    }

    setInventoryItems(updatedItems);
  };

  // Handle direct work order creation
  const handleAddWorkOrder = (workOrderData: any) => {
    const newWorkOrder: WorkOrder = {
      id: `WO-${1000 + workOrders.length + 1}`,
      title: workOrderData.title,
      description: workOrderData.description,
      assetId: workOrderData.asset
        ? assets.find((a) => a.name === workOrderData.asset)?.id || ""
        : "",
      assetName: workOrderData.asset || "",
      facility: workOrderData.facility,
      priority: workOrderData.priority,
      status: workOrderData.status,
      assignedTo: workOrderData.assignedTo || "",
      dueDate: workOrderData.dueDate
        ? workOrderData.dueDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      inventoryChecked: false,
      technicianAssigned: !!workOrderData.assignedTo,
      inventoryUpdated: false,
    };

    setWorkOrders([newWorkOrder, ...workOrders]);
    setIsAddWorkOrderModalOpen(false);
  };

  // Process maintenance request
  const handleProcessRequest = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setIsInventoryCheckModalOpen(true);
  };

  // Assign technician to work order
  const handleAssignTechnician = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsTechnicianAssignmentModalOpen(true);
  };

  // Complete work order and update inventory
  const handleCompleteWorkOrder = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsInventoryUpdateModalOpen(true);
  };

  // Filter maintenance requests
  const filteredRequests = maintenanceRequests.filter((request) => {
    // Filter by search query
    if (
      searchQuery &&
      !request.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.assetName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (statusFilter !== "all" && request.status !== statusFilter) {
      return false;
    }

    // Filter by priority
    if (
      priorityFilter !== "all" &&
      request.priority.toLowerCase() !== priorityFilter.toLowerCase()
    ) {
      return false;
    }

    return true;
  });

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Medium":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      case "High":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Critical":
        return "bg-[#ffebee] text-[#f44336] border-[#f44336]";
      default:
        return "";
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
      case "Open":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      case "In Progress":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "On Hold":
        return "bg-[#f5f5f5] text-[#9e9e9e] border-[#9e9e9e]";
      case "Completed":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Cancelled":
        return "bg-[#ffebee] text-[#f44336] border-[#f44336]";
      default:
        return "";
    }
  };

  // Get low stock items for the generate order modal
  const lowStockItems = inventoryItems.filter(
    (item) => item.status === "Low Stock" || item.status === "Out of Stock",
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#212121]">
          Maintenance Workflow
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
            onClick={() => setIsMaintenanceRequestModalOpen(true)}
          >
            <ClipboardList className="mr-2 h-4 w-4" /> Submit Maintenance
            Request
          </Button>
          <Button
            className="bg-[#1976d2] hover:bg-[#1565c0]"
            onClick={() => setIsAddWorkOrderModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Create Work Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">
              New Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1976d2]">
              {maintenanceRequests.filter((req) => req.status === "New").length}
            </div>
            <p className="text-xs text-[#9e9e9e] mt-1">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">
              Open Work Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#ff9800]">
              {
                workOrders.filter(
                  (wo) => wo.status === "Open" || wo.status === "In Progress",
                ).length
              }
            </div>
            <p className="text-xs text-[#9e9e9e] mt-1">
              In progress or awaiting assignment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">
              Completed This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4caf50]">
              {workOrders.filter((wo) => wo.status === "Completed").length}
            </div>
            <p className="text-xs text-[#9e9e9e] mt-1">Successfully resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#757575]">
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f44336]">
              {lowStockItems.length}
            </div>
            <p className="text-xs text-[#9e9e9e] mt-1">
              Items below minimum stock level
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 my-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#9e9e9e]" />
            <Input
              placeholder="Search..."
              className="pl-8 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border-[#e0e0e0] text-[#757575] hover:bg-[#f5f5f5] hover:text-[#424242]"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setPriorityFilter("all");
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-0">
          <div className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e0e0e0] flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#212121]">
                Maintenance Requests
              </h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#f5f5f5]">
                  <TableRow>
                    <TableHead className="text-[#616161]">ID</TableHead>
                    <TableHead className="text-[#616161]">
                      Request Title
                    </TableHead>
                    <TableHead className="text-[#616161]">Asset</TableHead>
                    <TableHead className="text-[#616161]">
                      Requested By
                    </TableHead>
                    <TableHead className="text-[#616161]">
                      Request Date
                    </TableHead>
                    <TableHead className="text-[#616161]">Priority</TableHead>
                    <TableHead className="text-[#616161]">Status</TableHead>
                    <TableHead className="text-right text-[#616161]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-[#fafafa]">
                        <TableCell className="font-medium text-[#212121]">
                          {request.id}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {request.title}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {request.assetName}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {request.requestedBy}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {request.requestDate}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(request.priority)}
                          >
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(request.status)}
                          >
                            {request.status}
                          </Badge>
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
                              {request.status === "New" && (
                                <DropdownMenuItem
                                  className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2] cursor-pointer"
                                  onClick={() => handleProcessRequest(request)}
                                >
                                  <Package className="mr-2 h-4 w-4" />
                                  Process Request
                                </DropdownMenuItem>
                              )}
                              {request.workOrderId && (
                                <DropdownMenuItem
                                  className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2] cursor-pointer"
                                  onClick={() => {
                                    const workOrder = workOrders.find(
                                      (wo) => wo.id === request.workOrderId,
                                    );
                                    if (workOrder) {
                                      setSelectedWorkOrder(workOrder);
                                      navigate("/work-orders");
                                    }
                                  }}
                                >
                                  <FileText className="mr-2 h-4 w-4" /> View
                                  Work Order
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2] cursor-pointer"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setIsMaintenanceRequestModalOpen(true);
                                }}
                              >
                                <FileText className="mr-2 h-4 w-4" /> View
                                Details
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
                        No maintenance requests found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MaintenanceRequestModal
        open={isMaintenanceRequestModalOpen}
        onOpenChange={setIsMaintenanceRequestModalOpen}
        onSubmitRequest={handleSubmitRequest}
        assets={assets}
        initialData={selectedRequest}
      />

      <InventoryCheckModal
        open={isInventoryCheckModalOpen}
        onOpenChange={setIsInventoryCheckModalOpen}
        onProceed={handleInventoryCheck}
        onGenerateOrder={() => setIsGenerateOrderModalOpen(true)}
        assetType={selectedRequest?.assetName || ""}
        inventoryItems={inventoryItems}
      />

      {/* Placeholder for TechnicianAssignmentModal - needs to be implemented */}
      {isTechnicianAssignmentModalOpen && (
        <Dialog
          open={isTechnicianAssignmentModalOpen}
          onOpenChange={setIsTechnicianAssignmentModalOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Technician</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Technician assignment functionality would go here.</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsTechnicianAssignmentModalOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <InventoryUpdateModal
        open={isInventoryUpdateModalOpen}
        onOpenChange={setIsInventoryUpdateModalOpen}
        onUpdateInventory={handleInventoryUpdate}
        onGenerateOrder={() => setIsGenerateOrderModalOpen(true)}
        workOrderId={selectedWorkOrder?.id || ""}
        inventoryItems={inventoryItems}
      />

      <AddWorkOrderModal
        open={isAddWorkOrderModalOpen}
        onOpenChange={setIsAddWorkOrderModalOpen}
        onAddWorkOrder={handleAddWorkOrder}
      />

      {/* Placeholder for GenerateOrderModal - needs to be implemented */}
      {isGenerateOrderModalOpen && (
        <Dialog
          open={isGenerateOrderModalOpen}
          onOpenChange={setIsGenerateOrderModalOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Order</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Order generation functionality would go here.</p>
              <p>Low stock items: {lowStockItems.length}</p>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  handleGenerateOrder({ items: lowStockItems });
                  setIsGenerateOrderModalOpen(false);
                }}
              >
                Generate Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
