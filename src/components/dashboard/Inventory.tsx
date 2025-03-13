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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InventoryItem {
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
}

export default function Inventory() {
  const inventoryItems: InventoryItem[] = [
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
    },
    {
      id: "INV-1002",
      name: "Light Bulbs (LED)",
      category: "Electrical",
      location: "Warehouse - Shelf A3",
      quantity: 120,
      minQuantity: 50,
      unit: "pcs",
      lastRestocked: "2023-06-01",
      supplier: "Electrical Depot",
      status: "In Stock",
    },
    {
      id: "INV-1003",
      name: "Cleaning Solution",
      category: "Janitorial",
      location: "All Buildings - Janitor Closets",
      quantity: 0,
      minQuantity: 10,
      unit: "gallons",
      lastRestocked: "2023-04-15",
      supplier: "CleanPro Supplies",
      status: "Out of Stock",
    },
    {
      id: "INV-1004",
      name: "Printer Paper",
      category: "Office Supplies",
      location: "Office Building - Supply Room",
      quantity: 25,
      minQuantity: 10,
      unit: "reams",
      lastRestocked: "2023-05-25",
      supplier: "Office Essentials",
      status: "In Stock",
    },
    {
      id: "INV-1005",
      name: "Safety Gloves",
      category: "Safety Equipment",
      location: "Warehouse - Safety Cabinet",
      quantity: 8,
      minQuantity: 15,
      unit: "pairs",
      lastRestocked: "2023-05-05",
      supplier: "SafetyFirst Inc.",
      status: "Low Stock",
    },
    {
      id: "INV-1006",
      name: "Replacement Parts - Elevator",
      category: "Mechanical",
      location: "Main Building - Maintenance Shop",
      quantity: 5,
      minQuantity: 2,
      unit: "sets",
      lastRestocked: "2023-03-20",
      supplier: "Elevator Systems Ltd.",
      status: "In Stock",
    },
    {
      id: "INV-1007",
      name: "Water Filters",
      category: "Plumbing",
      location: "All Buildings - Maintenance Shop",
      quantity: 0,
      minQuantity: 5,
      unit: "pcs",
      lastRestocked: "2023-02-15",
      supplier: "Plumbing Plus",
      status: "On Order",
    },
  ];

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      case "On Order":
        return "bg-blue-100 text-blue-800";
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
    if (ratio === 0) return "bg-red-500";
    if (ratio < 1) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Inventory</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Generate Order
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search inventory..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="maintenance">
                    Maintenance Supplies
                  </SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="janitorial">Janitorial</SelectItem>
                  <SelectItem value="office">Office Supplies</SelectItem>
                  <SelectItem value="safety">Safety Equipment</SelectItem>
                  <SelectItem value="mechanical">Mechanical</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
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
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Restocked</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        {item.quantity} {item.unit}
                        {item.quantity < item.minQuantity && (
                          <AlertTriangle className="inline-block ml-2 h-4 w-4 text-yellow-500" />
                        )}
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
                      <TableCell>{item.lastRestocked}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Item</DropdownMenuItem>
                            <DropdownMenuItem>Restock</DropdownMenuItem>
                            <DropdownMenuItem>Usage History</DropdownMenuItem>
                            <DropdownMenuItem>Place Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
