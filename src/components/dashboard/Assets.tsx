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
  Filter,
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
}

export default function Assets() {
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
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
    },
    {
      id: "AST-1006",
      name: "Elevator #2",
      type: "Transportation",
      facility: "Office Building",
      status: "Decommissioned",
      lastMaintenance: "2022-12-10",
      nextMaintenance: "N/A",
      purchaseDate: "2015-05-12",
      value: "$45,000",
      condition: "Poor",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [facilityFilter, setFacilityFilter] = useState("all");

  const handleAddAsset = (assetData: any) => {
    const newAsset: Asset = {
      id: `AST-${1000 + assets.length + 1}`,
      name: assetData.name,
      type: assetData.type,
      facility: assetData.facility,
      status: assetData.status,
      lastMaintenance: new Date().toISOString().split("T")[0],
      nextMaintenance: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 6 months from now
      purchaseDate: assetData.purchaseDate
        ? assetData.purchaseDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      value: assetData.value || "$0",
      condition: assetData.condition,
    };

    setAssets([newAsset, ...assets]);
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
    if (nextMaintenance === "N/A") return false;
    const today = new Date();
    const maintenance = new Date(nextMaintenance);
    return maintenance < today;
  };

  // Filter assets based on active tab, search query, and dropdown filters
  const filteredAssets = assets.filter((asset) => {
    // Filter by tab
    if (activeTab !== "all") {
      if (activeTab === "operational" && asset.status !== "Operational")
        return false;
      if (activeTab === "maintenance" && asset.status !== "Needs Maintenance")
        return false;
      if (activeTab === "repair" && asset.status !== "Under Repair")
        return false;
      if (activeTab === "decommissioned" && asset.status !== "Decommissioned")
        return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !asset.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !asset.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by type
    if (typeFilter !== "all" && asset.type.toLowerCase() !== typeFilter) {
      return false;
    }

    // Filter by facility
    if (facilityFilter !== "all") {
      const facilityMap: Record<string, string> = {
        main: "Main Building",
        warehouse: "Warehouse",
        office: "Office Building",
      };
      if (asset.facility !== facilityMap[facilityFilter]) {
        return false;
      }
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
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full md:w-auto grid-cols-5 bg-white border border-[#e0e0e0]">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="operational"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                Operational
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                Needs Maintenance
              </TabsTrigger>
              <TabsTrigger
                value="repair"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                Under Repair
              </TabsTrigger>
              <TabsTrigger
                value="decommissioned"
                className="data-[state=active]:bg-[#e3f2fd] data-[state=active]:text-[#1976d2] data-[state=active]:shadow-none"
              >
                Decommissioned
              </TabsTrigger>
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
              <Select
                defaultValue="all"
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Asset Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="power">Power</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
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
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#f5f5f5]">
                  <TableRow>
                    <TableHead className="text-[#616161]">ID</TableHead>
                    <TableHead className="text-[#616161]">Name</TableHead>
                    <TableHead className="text-[#616161]">Type</TableHead>
                    <TableHead className="text-[#616161]">Facility</TableHead>
                    <TableHead className="text-[#616161]">Status</TableHead>
                    <TableHead className="text-[#616161]">Condition</TableHead>
                    <TableHead className="text-[#616161]">
                      Last Maintenance
                    </TableHead>
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
                        <TableCell className="text-[#424242]">
                          {asset.lastMaintenance}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-[#424242]">
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
                              <DropdownMenuItem className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2]">
                                <Eye className="mr-2 h-4 w-4 text-[#1976d2]" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#4caf50]">
                                <Edit className="mr-2 h-4 w-4 text-[#4caf50]" />
                                Edit Asset
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2]">
                                <History className="mr-2 h-4 w-4 text-[#1976d2]" />
                                Maintenance History
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#ff9800]">
                                <Calendar className="mr-2 h-4 w-4 text-[#ff9800]" />
                                Schedule Maintenance
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-[#f44336] focus:bg-[#ffebee] focus:text-[#d32f2f]">
                                <Power className="mr-2 h-4 w-4" />
                                Decommission
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={10}
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
    </div>
  );
}
