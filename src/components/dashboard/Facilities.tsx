import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  MapPin,
  Users,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import AddFacilityModal from "./modals/AddFacilityModal";

interface Facility {
  id: string;
  name: string;
  location: string;
  type: string;
  status: "Operational" | "Under Maintenance" | "Closed";
  occupancy: number;
  totalCapacity: number;
  lastInspection: string;
  image: string;
}

export default function Facilities() {
  const [isAddFacilityModalOpen, setIsAddFacilityModalOpen] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: "FAC-001",
      name: "Main Building",
      location: "123 Corporate Drive, New York, NY",
      type: "Office",
      status: "Operational",
      occupancy: 245,
      totalCapacity: 300,
      lastInspection: "2023-05-10",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    },
    {
      id: "FAC-002",
      name: "Warehouse",
      location: "456 Industrial Parkway, New York, NY",
      type: "Storage",
      status: "Operational",
      occupancy: 12,
      totalCapacity: 20,
      lastInspection: "2023-04-22",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    },
    {
      id: "FAC-003",
      name: "Office Building",
      location: "789 Business Avenue, New York, NY",
      type: "Office",
      status: "Under Maintenance",
      occupancy: 0,
      totalCapacity: 150,
      lastInspection: "2023-06-01",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    },
    {
      id: "FAC-004",
      name: "Research Lab",
      location: "101 Innovation Street, New York, NY",
      type: "Laboratory",
      status: "Operational",
      occupancy: 35,
      totalCapacity: 50,
      lastInspection: "2023-05-15",
      image:
        "https://images.unsplash.com/photo-1566165111-cb8b2c3c193b?w=800&q=80",
    },
    {
      id: "FAC-005",
      name: "Distribution Center",
      location: "202 Logistics Road, New York, NY",
      type: "Storage",
      status: "Closed",
      occupancy: 0,
      totalCapacity: 100,
      lastInspection: "2023-03-30",
      image:
        "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
    },
    {
      id: "FAC-006",
      name: "Training Center",
      location: "303 Education Blvd, New York, NY",
      type: "Training",
      status: "Operational",
      occupancy: 28,
      totalCapacity: 75,
      lastInspection: "2023-05-28",
      image:
        "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80",
    },
  ]);

  const handleAddFacility = (facilityData: any) => {
    const newFacility: Facility = {
      id: `FAC-${1000 + facilities.length + 1}`,
      name: facilityData.name,
      type: facilityData.type,
      location: facilityData.location,
      status: facilityData.status,
      occupancy: 0,
      totalCapacity: parseInt(facilityData.totalCapacity) || 0,
      lastInspection: facilityData.lastInspection
        ? facilityData.lastInspection.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    };

    setFacilities([newFacility, ...facilities]);
  };

  const getStatusColor = (status: Facility["status"]) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800";
      case "Under Maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const getOccupancyPercentage = (occupancy: number, capacity: number) => {
    return Math.round((occupancy / capacity) * 100);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Facilities</h1>
            <Button onClick={() => setIsAddFacilityModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Facility
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="operational">Operational</TabsTrigger>
              <TabsTrigger value="maintenance">Under Maintenance</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search facilities..." className="pl-8" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <Card key={facility.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{facility.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={getStatusColor(facility.status)}
                    >
                      {facility.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {facility.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Occupancy
                      </span>
                      <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1 text-primary" />
                        <span className="text-sm font-medium">
                          {facility.occupancy}/{facility.totalCapacity} (
                          {getOccupancyPercentage(
                            facility.occupancy,
                            facility.totalCapacity,
                          )}
                          %)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Last Inspection
                      </span>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-primary" />
                        <span className="text-sm font-medium">
                          {facility.lastInspection}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <AddFacilityModal
        open={isAddFacilityModalOpen}
        onOpenChange={setIsAddFacilityModalOpen}
        onAddFacility={handleAddFacility}
      />
    </div>
  );
}
