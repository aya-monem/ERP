import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  RefreshCw,
  MoreHorizontal,
  AlertTriangle,
  Eye,
  Edit,
  History,
  Calendar,
  Power,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddAssetModal from "./modals/AddAssetModal";
import ViewAssetModal from "./modals/ViewAssetModal";
import EditAssetModal from "./modals/EditAssetModal";
import MaintenanceHistoryModal from "./modals/MaintenanceHistoryModal";
import ScheduleMaintenanceModal from "./modals/ScheduleMaintenanceModal";
import DecommissionAssetModal from "./modals/DecommissionAssetModal";

interface Asset {
  id: string;
  name: string;
  type: string;
  facility: string;
  status:
    | "Operational"
    | "Needs Maintenance"
    | "Under Repair"
    | "Decommissioned";
  lastMaintenance: string;
  nextMaintenance: string;
  purchaseDate: string;
  value: string;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  description?: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  warrantyExpiration?: string;
}

export default function Assets() {
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [isViewAssetModalOpen, setIsViewAssetModalOpen] = useState(false);
  const [isEditAssetModalOpen, setIsEditAssetModalOpen] = useState(false);
  const [isMaintenanceHistoryModalOpen, setIsMaintenanceHistoryModalOpen] =
    useState(false);
  const [isScheduleMaintenanceModalOpen, setIsScheduleMaintenanceModalOpen] =
    useState(false);
  const [isDecommissionAssetModalOpen, setIsDecommissionAssetModalOpen] =
    useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "AST-1001",
      name: "HVAC System - 3rd Floor",
      type: "HVAC",
      facility: "Main Building",
      status: "Needs Maintenance",
      lastMaintenance: "2023-01-15",
      nextMaintenance: "2023-07-15",
      purchaseDate: "2020-06-10",
      value: "$25,000",
      condition: "Fair",
      description:
        "Central HVAC system serving the 3rd floor offices and meeting rooms",
      manufacturer: "Carrier",
      model: "XHV-5000",
      serialNumber: "CAR-2020-78542",
      warrantyExpiration: "2025-06-10",
    },
    {
      id: "AST-1002",
      name: "Forklift #3",
      type: "Equipment",
      facility: "Warehouse",
      status: "Operational",
      lastMaintenance: "2023-05-20",
      nextMaintenance: "2023-11-20",
      purchaseDate: "2021-03-15",
      value: "$18,500",
      condition: "Good",
      manufacturer: "Toyota",
      model: "8FGU25",
      serialNumber: "TYT-8FGU25-12345",
    },
    {
      id: "AST-1003",
      name: "Conference Room A/V System",
      type: "Electronics",
      facility: "Office Building",
      status: "Under Repair",
      lastMaintenance: "2023-04-10",
      nextMaintenance: "2023-10-10",
      purchaseDate: "2022-01-05",
      value: "$12,000",
      condition: "Fair",
      description: "Audio/visual system for the main conference room",
    },
    {
      id: "AST-1004",
      name: "Backup Generator",
      type: "Power",
      facility: "Main Building",
      status: "Operational",
      lastMaintenance: "2023-06-01",
      nextMaintenance: "2023-12-01",
      purchaseDate: "2019-11-20",
      value: "$35,000",
      condition: "Good",
      manufacturer: "Generac",
      model: "SG080",
      serialNumber: "GEN-SG080-45678",
    },
    {
      id: "AST-1005",
      name: "Security Camera System",
      type: "Security",
      facility: "Warehouse",
      status: "Operational",
      lastMaintenance: "2023-05-15",
      nextMaintenance: "2023-11-15",
      purchaseDate: "2021-09-30",
      value: "$8,200",
      condition: "Excellent",
      manufacturer: "Hikvision",
      model: "DS-2CD2T85G1",
    },
    {
      id: "AST-1006",
      name: "Elevator #2",
      type: "Transportation",
      facility: "Main Building",
      status: "Operational",
      lastMaintenance: "2023-04-05",
      nextMaintenance: "2023-10-05",
      purchaseDate: "2018-07-12",
      value: "$45,000",
      condition: "Good",
      manufacturer: "Otis",
      model: "Gen2",
      serialNumber: "OT-GEN2-98765",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [facilityFilter, setFacilityFilter] = useState("all");

  const handleAddAsset = (assetData: any) => {
    const newAsset: Asset = {
      id: `AST-${1000 + assets.length + 1}`,
      name: assetData.name,
      type: assetData.type,
      facility: assetData.facility,
      status: assetData.status || "Operational",
      lastMaintenance: assetData.lastMaintenance
        ? assetData.lastMaintenance.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      nextMaintenance: assetData.nextMaintenance
        ? assetData.nextMaintenance.toISOString().split("T")[0]
        : new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
      purchaseDate: assetData.purchaseDate
        ? assetData.purchaseDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      value: assetData.value ? `$${assetData.value}` : "$0",
      condition: assetData.condition || "Good",
      description: assetData.description || "",
      manufacturer: assetData.manufacturer || "",
      model: assetData.model || "",
      serialNumber: assetData.serialNumber || "",
    };

    setAssets([newAsset, ...assets]);
  };

  const handleUpdateAsset = (updatedAsset: Asset) => {
    const updatedAssets = assets.map((asset) =>
      asset.id === updatedAsset.id ? updatedAsset : asset,
    );
    setAssets(updatedAssets);
  };

  const handleDecommissionAsset = (decommissionData: any) => {
    const updatedAssets = assets.map((asset) =>
      asset.id === decommissionData.assetId
        ? { ...asset, status: "Decommissioned" }
        : asset,
    );
    setAssets(updatedAssets);
  };

  const handleScheduleMaintenance = (maintenanceData: any) => {
    const updatedAssets = assets.map((asset) =>
      asset.id === maintenanceData.assetId
        ? {
            ...asset,
            nextMaintenance: maintenanceData.scheduledDate,
          }
        : asset,
    );
    setAssets(updatedAssets);
  };

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsViewAssetModalOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsEditAssetModalOpen(true);
  };

  const handleMaintenanceHistory = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsMaintenanceHistoryModalOpen(true);
  };

  const handleScheduleAssetMaintenance = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsScheduleMaintenanceModalOpen(true);
  };

  const handleDecommission = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDecommissionAssetModalOpen(true);
  };

  const getStatusColor = (status: Asset["status"]) => {
    switch (status) {
      case "Operational":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Needs Maintenance":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Under Repair":
        return "bg-[#fff8e1] text-[#ffa000] border-[#ffa000]";
      case "Decommissioned":
        return "bg-[#f5f5f5] text-[#9e9e9e] border-[#9e9e9e]";
      default:
        return "";
    }
  };

  const getConditionColor = (condition: Asset["condition"]) => {
    switch (condition) {
      case "Excellent":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Good":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      case "Fair":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Poor":
        return "bg-[#ffebee] text-[#f44336] border-[#f44336]";
      default:
        return "";
    }
  };

  const isMaintenanceOverdue = (nextMaintenance: string) => {
    const today = new Date();
    const maintenance = new Date(nextMaintenance);
    return maintenance < today;
  };

  // Filter assets based on search query and dropdown filters
  const filteredAssets = assets.filter((asset) => {
    // Filter by search query
    if (
      searchQuery &&
      !asset.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !asset.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !asset.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(
        asset.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        false
      )
    ) {
      return false;
    }

    // Filter by type
    if (typeFilter !== "all" && asset.type !== typeFilter) {
      return false;
    }

    // Filter by status
    if (statusFilter !== "all" && asset.status !== statusFilter) {
      return false;
    }

    // Filter by facility
    if (facilityFilter !== "all" && asset.facility !== facilityFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#212121]">Assets</h1>
            <Button
              className="bg-[#1976d2] hover:bg-[#1565c0]"
              onClick={() => setIsAddAssetModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Asset
            </Button>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-6"
            value={statusFilter === "all" ? "all" : statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All Assets</TabsTrigger>
              <TabsTrigger value="Operational">Operational</TabsTrigger>
              <TabsTrigger value="Needs Maintenance">
                Needs Maintenance
              </TabsTrigger>
              <TabsTrigger value="Under Repair">Under Repair</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#9e9e9e]" />
              <Input
                placeholder="Search assets..."
                className="pl-8 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Asset Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Power">Power</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Operational">Operational</SelectItem>
                  <SelectItem value="Needs Maintenance">
                    Needs Maintenance
                  </SelectItem>
                  <SelectItem value="Under Repair">Under Repair</SelectItem>
                  <SelectItem value="Decommissioned">Decommissioned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={facilityFilter} onValueChange={setFacilityFilter}>
                <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Facility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Facilities</SelectItem>
                  <SelectItem value="Main Building">Main Building</SelectItem>
                  <SelectItem value="Warehouse">Warehouse</SelectItem>
                  <SelectItem value="Office Building">
                    Office Building
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="border-[#e0e0e0] text-[#757575] hover:bg-[#f5f5f5] hover:text-[#424242]"
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("all");
                  setStatusFilter("all");
                  setFacilityFilter("all");
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e0e0e0] flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#212121]">
                Asset Inventory
              </h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#f5f5f5]">
                  <TableRow>
                    <TableHead className="text-[#616161]">ID</TableHead>
                    <TableHead className="text-[#616161]">Asset Name</TableHead>
                    <TableHead className="text-[#616161]">Type</TableHead>
                    <TableHead className="text-[#616161]">Facility</TableHead>
                    <TableHead className="text-[#616161]">Status</TableHead>
                    <TableHead className="text-[#616161]">Condition</TableHead>
                    <TableHead className="text-[#616161]">
                      Next Maintenance
                    </TableHead>
                    <TableHead className="text-[#616161]">Value</TableHead>
                    <TableHead className="text-right text-[#616161]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <TableRow key={asset.id} className="hover:bg-[#fafafa]">
                        <TableCell className="font-medium text-[#212121]">
                          {asset.id}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {asset.name}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {asset.type}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {asset.facility}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(asset.status)}
                          >
                            {asset.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getConditionColor(asset.condition)}
                          >
                            {asset.condition}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-[#757575]" />
                            <span
                              className={`${isMaintenanceOverdue(asset.nextMaintenance) ? "text-[#f44336]" : "text-[#424242]"}`}
                            >
                              {asset.nextMaintenance}
                            </span>
                            {isMaintenanceOverdue(asset.nextMaintenance) && (
                              <AlertTriangle className="ml-2 h-4 w-4 text-[#f44336]" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {asset.value}
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
                                onClick={() => handleViewAsset(asset)}
                              >
                                <Eye className="mr-2 h-4 w-4 text-[#1976d2]" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#4caf50] cursor-pointer"
                                onClick={() => handleEditAsset(asset)}
                              >
                                <Edit className="mr-2 h-4 w-4 text-[#4caf50]" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#ff9800] cursor-pointer"
                                onClick={() => handleMaintenanceHistory(asset)}
                              >
                                <History className="mr-2 h-4 w-4 text-[#ff9800]" />
                                Maintenance History
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2] cursor-pointer"
                                onClick={() =>
                                  handleScheduleAssetMaintenance(asset)
                                }
                              >
                                <Calendar className="mr-2 h-4 w-4 text-[#1976d2]" />
                                Schedule Maintenance
                              </DropdownMenuItem>
                              {asset.status !== "Decommissioned" && (
                                <DropdownMenuItem
                                  className="text-[#f44336] focus:bg-[#ffebee] focus:text-[#d32f2f] cursor-pointer"
                                  onClick={() => handleDecommission(asset)}
                                >
                                  <Power className="mr-2 h-4 w-4" />
                                  Decommission
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="h-24 text-center text-[#757575]"
                      >
                        No assets found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>

      <AddAssetModal
        open={isAddAssetModalOpen}
        onOpenChange={setIsAddAssetModalOpen}
        onAddAsset={handleAddAsset}
      />

      {selectedAsset && (
        <>
          <ViewAssetModal
            open={isViewAssetModalOpen}
            onOpenChange={setIsViewAssetModalOpen}
            asset={selectedAsset}
          />

          <EditAssetModal
            open={isEditAssetModalOpen}
            onOpenChange={setIsEditAssetModalOpen}
            asset={selectedAsset}
            onUpdateAsset={handleUpdateAsset}
          />

          <MaintenanceHistoryModal
            open={isMaintenanceHistoryModalOpen}
            onOpenChange={setIsMaintenanceHistoryModalOpen}
            asset={selectedAsset}
          />

          <ScheduleMaintenanceModal
            open={isScheduleMaintenanceModalOpen}
            onOpenChange={setIsScheduleMaintenanceModalOpen}
            asset={selectedAsset}
            onScheduleMaintenance={handleScheduleMaintenance}
          />

          <DecommissionAssetModal
            open={isDecommissionAssetModalOpen}
            onOpenChange={setIsDecommissionAssetModalOpen}
            asset={selectedAsset}
            onDecommissionAsset={handleDecommissionAsset}
          />
        </>
      )}
    </div>
  );
}
