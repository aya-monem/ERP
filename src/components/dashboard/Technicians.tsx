import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Technician {
  id: string;
  name: string;
  specialty: string;
  status: "Available" | "On Job" | "Off Duty" | "On Leave";
  workOrdersAssigned: number;
  completedToday: number;
  avatar: string;
  contactNumber: string;
}

export default function Technicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([
    {
      id: "TECH-001",
      name: "Mike Johnson",
      specialty: "HVAC Systems",
      status: "On Job",
      workOrdersAssigned: 3,
      completedToday: 1,
      avatar: "MJ",
      contactNumber: "555-0123",
    },
    {
      id: "TECH-002",
      name: "Sarah Williams",
      specialty: "Electrical",
      status: "Available",
      workOrdersAssigned: 1,
      completedToday: 2,
      avatar: "SW",
      contactNumber: "555-0124",
    },
    {
      id: "TECH-003",
      name: "David Chen",
      specialty: "Plumbing",
      status: "Available",
      workOrdersAssigned: 2,
      completedToday: 1,
      avatar: "DC",
      contactNumber: "555-0125",
    },
    {
      id: "TECH-004",
      name: "Lisa Rodriguez",
      specialty: "General Maintenance",
      status: "Off Duty",
      workOrdersAssigned: 0,
      completedToday: 3,
      avatar: "LR",
      contactNumber: "555-0126",
    },
    {
      id: "TECH-005",
      name: "James Wilson",
      specialty: "IT Equipment",
      status: "On Job",
      workOrdersAssigned: 2,
      completedToday: 0,
      avatar: "JW",
      contactNumber: "555-0127",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "On Job":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Off Duty":
        return "bg-[#f5f5f5] text-[#9e9e9e] border-[#9e9e9e]";
      case "On Leave":
        return "bg-[#ffebee] text-[#f44336] border-[#f44336]";
      default:
        return "";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-[#212121]">
          Technicians
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#f5f5f5]">
              <TableRow>
                <TableHead className="text-[#616161]">Technician</TableHead>
                <TableHead className="text-[#616161]">Specialty</TableHead>
                <TableHead className="text-[#616161]">Status</TableHead>
                <TableHead className="text-[#616161]">Assigned WOs</TableHead>
                <TableHead className="text-[#616161]">
                  Completed Today
                </TableHead>
                <TableHead className="text-[#616161]">Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicians.map((tech) => (
                <TableRow key={tech.id} className="hover:bg-[#fafafa]">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-[#e3f2fd]">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tech.name}`}
                          alt={tech.name}
                        />
                        <AvatarFallback className="text-[#1976d2]">
                          {tech.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#212121]">
                          {tech.name}
                        </p>
                        <p className="text-xs text-[#757575]">{tech.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#424242]">
                    {tech.specialty}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(tech.status)}
                    >
                      {tech.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#424242]">
                    {tech.workOrdersAssigned}
                  </TableCell>
                  <TableCell className="text-[#424242]">
                    {tech.completedToday}
                  </TableCell>
                  <TableCell className="text-[#424242]">
                    {tech.contactNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
