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
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  AlertTriangle,
  ShoppingCart,
  Download,
  Printer,
  RefreshCw,
  Eye,
  Edit,
  History,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AddInventoryModal from "./modals/AddInventoryModal";
import GenerateOrderModal from "./modals/GenerateOrderModal";
import ViewInventoryItemModal from "./modals/ViewInventoryItemModal";
import EditInventoryItemModal from "./modals/EditInventoryItemModal";
import UsageHistoryModal from "./modals/UsageHistoryModal";

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  lastRestocked: string;
  supplier: string;
  status: "In Stock" | "Low Stock" | "Out of Stock" | "On Order";
  partNumber?: string;
  unitCost?: string;
}

export default function Inventory() {
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
      name: "LED Light Bulbs",
      category: "Electrical",
      location: "Warehouse A - Shelf 3",
      quantity: 200,
      minQuantity: 100,
      unit: "pcs",
      lastRestocked: "2024-02-15",
      supplier: "BrightLights Co.",
      status: "In Stock",
      partNumber: "LED-BL-45W",
      unitCost: "$5.49",
    },
    {
      id: "INV-1003",
      name: "Engine Oil 5W-30",
      category: "Mechanical",
      location: "Garage Storage - Rack 2",
      quantity: 4,
      minQuantity: 10,
      unit: "liters",
      lastRestocked: "2024-03-05",
      supplier: "AutoParts Inc.",
      status: "Low Stock",
      partNumber: "EO-5W30",
      unitCost: "$24.99",
    },
    {
      id: "INV-1004",
      name: "Office Printer Paper",
      category: "Stationery",
      location: "Office Supply Room",
      quantity: 500,
      minQuantity: 200,
      unit: "reams",
      lastRestocked: "2024-02-20",
      supplier: "PaperWorld",
      status: "In Stock",
      partNumber: "PP-A4-75G",
      unitCost: "$3.99",
    },
    {
      id: "INV-1005",
      name: "Safety Gloves",
      category: "PPE",
      location: "Maintenance Depot",
      quantity: 50,
      minQuantity: 20,
      unit: "pairs",
      lastRestocked: "2024-03-10",
      supplier: "SafeHands Co.",
      status: "In Stock",
      partNumber: "SG-IND-XL",
      unitCost: "$8.99",
    },
    {
      id: "INV-1006",
      name: "Water Pumps",
      category: "Plumbing",
      location: "Warehouse C - Aisle 4",
      quantity: 5,
      minQuantity: 2,
      unit: "units",
      lastRestocked: "2024-01-30",
      supplier: "FlowTech",
      status: "In Stock",
      partNumber: "WP-FT-500",
      unitCost: "$350.00",
    },
    {
      id: "INV-1007",
      name: "Fire Extinguishers",
      category: "Safety Equipment",
      location: "Safety Room - Shelf 2",
      quantity: 0,
      minQuantity: 5,
      unit: "units",
      lastRestocked: "2024-02-25",
      supplier: "FireGuard",
      status: "Out of Stock",
      partNumber: "FE-ABC-10KG",
      unitCost: "$75.00",
    },
    {
      id: "INV-1008",
      name: "Welding Rods",
      category: "Tools",
      location: "Workshop Storage",
      quantity: 300,
      minQuantity: 100,
      unit: "pcs",
      lastRestocked: "2024-02-28",
      supplier: "WeldPro",
      status: "In Stock",
      partNumber: "WR-WP-6013",
      unitCost: "$2.50",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isGenerateOrderModalOpen, setIsGenerateOrderModalOpen] =
    useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isUsageHistoryModalOpen, setIsUsageHistoryModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleAddInventoryItem = (itemData: any) => {
    const newItem: InventoryItem = {
      id: `INV-${1000 + inventoryItems.length + 1}`,
      name: itemData.name,
      category: itemData.category,
      location: itemData.location,
      quantity: parseInt(itemData.quantity) || 0,
      minQuantity: parseInt(itemData.minQuantity) || 0,
      unit: itemData.unit || "pcs",
      lastRestocked: itemData.lastRestocked
        ? itemData.lastRestocked.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      supplier: itemData.supplier || "",
      status: determineStatus(
        parseInt(itemData.quantity) || 0,
        parseInt(itemData.minQuantity) || 0,
      ),
      partNumber: itemData.partNumber || "",
      unitCost: itemData.unitCost || "$0.00",
    };

    setInventoryItems([newItem, ...inventoryItems]);
  };

  const handleGenerateOrder = (orderData: any) => {
    // Update inventory items that were ordered
    const updatedItems = [...inventoryItems];

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

    setInventoryItems(updatedItems);

    // In a real app, you would save the order to a database
    console.log("Order generated:", orderData);
  };

  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsViewItemModalOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditItemModalOpen(true);
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    const updatedItems = inventoryItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    setInventoryItems(updatedItems);
  };

  const handleRestock = (item: InventoryItem) => {
    // For demo purposes, let's increase the quantity by 10
    const updatedItems = inventoryItems.map((inventoryItem) => {
      if (inventoryItem.id === item.id) {
        const newQuantity = inventoryItem.quantity + 10;
        return {
          ...inventoryItem,
          quantity: newQuantity,
          status: determineStatus(newQuantity, inventoryItem.minQuantity),
          lastRestocked: new Date().toISOString().split("T")[0],
        };
      }
      return inventoryItem;
    });

    setInventoryItems(updatedItems);
  };

  const handleViewUsageHistory = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsUsageHistoryModalOpen(true);
  };

  const determineStatus = (
    quantity: number,
    minQuantity: number,
  ): InventoryItem["status"] => {
    if (quantity === 0) return "Out of Stock";
    if (quantity < minQuantity) return "Low Stock";
    return "In Stock";
  };

  const getStatusColor = (status: InventoryItem["status"]) => {
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
    // Calculate percentage based on minimum quantity (200% if double the min quantity)
    const percentage = (quantity / minQuantity) * 100;
    // Cap at 100% for the progress bar
    return Math.min(percentage, 100);
  };

  const getProgressColor = (quantity: number, minQuantity: number) => {
    const ratio = quantity / minQuantity;
    if (ratio === 0) return "bg-[#f44336]";
    if (ratio < 1) return "bg-[#ff9800]";
    return "bg-[#4caf50]";
  };

  // Filter inventory items based on search query and dropdown filters
  const filteredItems = inventoryItems.filter((item) => {
    // Filter by search query
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (
      categoryFilter !== "all" &&
      item.category.toLowerCase().replace(/\s+/g, "-") !== categoryFilter
    ) {
      return false;
    }

    // Filter by status
    if (
      statusFilter !== "all" &&
      item.status.toLowerCase().replace(/\s+/g, "-") !== statusFilter
    ) {
      return false;
    }

    return true;
  });

  // Get low stock items for the generate order modal
  const lowStockItems = inventoryItems.filter(
    (item) => item.status === "Low Stock" || item.status === "Out of Stock",
  );

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#212121]">Inventory</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
                onClick={() => setIsGenerateOrderModalOpen(true)}
                disabled={lowStockItems.length === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Generate Order
              </Button>
              <Button
                className="bg-[#1976d2] hover:bg-[#1565c0]"
                onClick={() => setIsAddItemModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#9e9e9e]" />
              <Input
                placeholder="Search inventory..."
                className="pl-8 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="maintenance-supplies">
                    Maintenance Supplies
                  </SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="mechanical">Mechanical</SelectItem>
                  <SelectItem value="stationery">Stationery</SelectItem>
                  <SelectItem value="ppe">PPE</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="safety-equipment">
                    Safety Equipment
                  </SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="on-order">On Order</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="border-[#e0e0e0] text-[#757575] hover:bg-[#f5f5f5] hover:text-[#424242]"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#e0e0e0] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e0e0e0] flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#212121]">
                Inventory Items
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
                >
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
                >
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#f5f5f5]">
                  <TableRow>
                    <TableHead className="text-[#616161]">ID</TableHead>
                    <TableHead className="text-[#616161]">Item Name</TableHead>
                    <TableHead className="text-[#616161]">Category</TableHead>
                    <TableHead className="text-[#616161]">Location</TableHead>
                    <TableHead className="text-[#616161]">Quantity</TableHead>
                    <TableHead className="text-[#616161]">
                      Stock Level
                    </TableHead>
                    <TableHead className="text-[#616161]">Status</TableHead>
                    <TableHead className="text-[#616161]">
                      Last Restocked
                    </TableHead>
                    <TableHead className="text-[#616161]">Supplier</TableHead>
                    <TableHead className="text-right text-[#616161]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-[#fafafa]">
                        <TableCell className="font-medium text-[#212121]">
                          {item.id}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {item.category}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {item.location}
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
                              className={`h-2 ${getProgressColor(item.quantity, item.minQuantity)}`}
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
                        <TableCell className="text-[#424242]">
                          {item.lastRestocked}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {item.supplier}
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
                                onClick={() => handleViewDetails(item)}
                              >
                                <Eye className="mr-2 h-4 w-4 text-[#1976d2]" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#4caf50] cursor-pointer"
                                onClick={() => handleEditItem(item)}
                              >
                                <Edit className="mr-2 h-4 w-4 text-[#4caf50]" />
                                Edit Item
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#ff9800] cursor-pointer"
                                onClick={() => handleRestock(item)}
                              >
                                <RefreshCw className="mr-2 h-4 w-4 text-[#ff9800]" />
                                Restock
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-[#e0e0e0]" />
                              <DropdownMenuItem
                                className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2] cursor-pointer"
                                onClick={() => handleViewUsageHistory(item)}
                              >
                                <History className="mr-2 h-4 w-4 text-[#1976d2]" />
                                Usage History
                              </DropdownMenuItem>
                              {(item.status === "Low Stock" ||
                                item.status === "Out of Stock") && (
                                <DropdownMenuItem
                                  className="text-[#424242] focus:bg-[#f5f5f5] focus:text-[#1976d2] cursor-pointer"
                                  onClick={() =>
                                    setIsGenerateOrderModalOpen(true)
                                  }
                                >
                                  <ShoppingCart className="mr-2 h-4 w-4 text-[#1976d2]" />
                                  Place Order
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
                        colSpan={10}
                        className="h-24 text-center text-[#757575]"
                      >
                        No inventory items found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>

      <AddInventoryModal
        open={isAddItemModalOpen}
        onOpenChange={setIsAddItemModalOpen}
        onAddInventory={handleAddInventoryItem}
      />

      <GenerateOrderModal
        open={isGenerateOrderModalOpen}
        onOpenChange={setIsGenerateOrderModalOpen}
        onGenerateOrder={handleGenerateOrder}
        lowStockItems={lowStockItems}
      />

      {selectedItem && (
        <>
          <ViewInventoryItemModal
            open={isViewItemModalOpen}
            onOpenChange={setIsViewItemModalOpen}
            item={selectedItem}
            onRestock={handleRestock}
          />

          <EditInventoryItemModal
            open={isEditItemModalOpen}
            onOpenChange={setIsEditItemModalOpen}
            item={selectedItem}
            onUpdateItem={handleUpdateItem}
          />

          <UsageHistoryModal
            open={isUsageHistoryModalOpen}
            onOpenChange={setIsUsageHistoryModalOpen}
            item={selectedItem}
          />
        </>
      )}
    </div>
  );
}
