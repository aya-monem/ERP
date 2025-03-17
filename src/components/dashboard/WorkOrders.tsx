import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkOrdersTable from "./WorkOrdersTable";
import { Plus, Filter, Search } from "lucide-react";
import AddWorkOrderModal from "./modals/AddWorkOrderModal";
import ViewWorkOrderModal from "./modals/ViewWorkOrderModal";
import EditWorkOrderModal from "./modals/EditWorkOrderModal";

export interface WorkOrder {
  id: string;
  title: string;
  facility: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "On Hold" | "Completed";
  assignedTo: string;
  dueDate: string;
  requestId?: string;
}

export default function WorkOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [facilityFilter, setFacilityFilter] = useState("all");
  const [isAddWorkOrderModalOpen, setIsAddWorkOrderModalOpen] = useState(false);
  const [isViewWorkOrderModalOpen, setIsViewWorkOrderModalOpen] =
    useState(false);
  const [isEditWorkOrderModalOpen, setIsEditWorkOrderModalOpen] =
    useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(
    null,
  );
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: "WO-1001",
      title: "HVAC Repair - 3rd Floor",
      facility: "Main Building",
      priority: "High",
      status: "In Progress",
      assignedTo: "Mike Johnson",
      dueDate: "2023-06-15",
      requestId: "REQ-1002",
    },
    {
      id: "WO-1002",
      title: "Lighting Replacement",
      facility: "Warehouse",
      priority: "Medium",
      status: "Open",
      assignedTo: "Sarah Williams",
      dueDate: "2023-06-18",
    },
    {
      id: "WO-1003",
      title: "Plumbing Issue - Restroom",
      facility: "Office Building",
      priority: "Critical",
      status: "On Hold",
      assignedTo: "Robert Davis",
      dueDate: "2023-06-12",
    },
    {
      id: "WO-1004",
      title: "Door Lock Repair",
      facility: "Main Building",
      priority: "Low",
      status: "Completed",
      assignedTo: "Jennifer Lee",
      dueDate: "2023-06-10",
    },
  ]);

  const handleAddWorkOrder = (workOrderData: any) => {
    const newWorkOrder: WorkOrder = {
      id: `WO-${1000 + workOrders.length + 1}`,
      title: workOrderData.title,
      facility: workOrderData.facility,
      priority: workOrderData.priority,
      status: workOrderData.status,
      assignedTo: workOrderData.assignedTo || "",
      dueDate: workOrderData.dueDate
        ? workOrderData.dueDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      requestId: workOrderData.requestId,
    };

    setWorkOrders([newWorkOrder, ...workOrders]);
  };

  const handleViewWorkOrder = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsViewWorkOrderModalOpen(true);
  };

  const handleEditWorkOrder = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsEditWorkOrderModalOpen(true);
  };

  const handleUpdateWorkOrder = (updatedWorkOrder: WorkOrder) => {
    const updatedWorkOrders = workOrders.map((order) =>
      order.id === updatedWorkOrder.id ? updatedWorkOrder : order,
    );
    setWorkOrders(updatedWorkOrders);
  };

  const handleRescheduleWorkOrder = (workOrder: WorkOrder) => {
    // For simplicity, we'll just open the edit modal
    handleEditWorkOrder(workOrder);
  };

  const handleMarkComplete = (workOrder: WorkOrder) => {
    const updatedWorkOrder = { ...workOrder, status: "Completed" as const };
    handleUpdateWorkOrder(updatedWorkOrder);
  };

  const handleDeleteWorkOrder = (workOrderId: string) => {
    const updatedWorkOrders = workOrders.filter(
      (order) => order.id !== workOrderId,
    );
    setWorkOrders(updatedWorkOrders);
  };

  // Function to get status color for badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      case "In Progress":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "On Hold":
        return "bg-[#f5f5f5] text-[#9e9e9e] border-[#9e9e9e]";
      case "Completed":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#212121]">Work Orders</h1>
            <Button
              className="bg-[#1976d2] hover:bg-[#1565c0]"
              onClick={() => setIsAddWorkOrderModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Create Work Order
            </Button>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-6"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-5 bg-white border border-[#e0e0e0]">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="open"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                Open
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="on-hold"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                On Hold
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#9e9e9e]" />
              <Input
                placeholder="Search work orders..."
                className="pl-8 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                defaultValue="all"
                value={priorityFilter}
                onValueChange={setPriorityFilter}
              >
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
              <Select
                defaultValue="all"
                value={facilityFilter}
                onValueChange={setFacilityFilter}
              >
                <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Facility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Facilities</SelectItem>
                  <SelectItem value="main">Main Building</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="office">Office Building</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="border-[#e0e0e0] text-[#757575] hover:bg-[#f5f5f5] hover:text-[#424242]"
                onClick={() => {
                  setSearchQuery("");
                  setPriorityFilter("all");
                  setFacilityFilter("all");
                  setActiveTab("all");
                }}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <WorkOrdersTable
            className="w-full"
            workOrders={workOrders}
            searchQuery={searchQuery}
            priorityFilter={priorityFilter}
            facilityFilter={facilityFilter}
            activeTab={activeTab}
            onViewDetails={handleViewWorkOrder}
            onEdit={handleEditWorkOrder}
            onReschedule={handleRescheduleWorkOrder}
            onMarkComplete={handleMarkComplete}
            onDelete={handleDeleteWorkOrder}
          />
        </main>
      </div>

      <AddWorkOrderModal
        open={isAddWorkOrderModalOpen}
        onOpenChange={setIsAddWorkOrderModalOpen}
        onAddWorkOrder={handleAddWorkOrder}
      />

      {selectedWorkOrder && (
        <>
          <ViewWorkOrderModal
            open={isViewWorkOrderModalOpen}
            onOpenChange={setIsViewWorkOrderModalOpen}
            workOrder={selectedWorkOrder}
          />

          <EditWorkOrderModal
            open={isEditWorkOrderModalOpen}
            onOpenChange={setIsEditWorkOrderModalOpen}
            workOrder={selectedWorkOrder}
            onUpdateWorkOrder={handleUpdateWorkOrder}
          />
        </>
      )}
    </div>
  );
}
