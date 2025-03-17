import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle2, Clock } from "lucide-react";

interface Technician {
  id: string;
  name: string;
  specialization: string;
  availability: "Available" | "Busy" | "Off Duty";
  currentLoad: number; // Number of active work orders
  skills: string[];
}

interface TechnicianAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (assignmentData: any) => void;
  workOrderType: string;
  priority: string;
}

export default function TechnicianAssignmentModal({
  open,
  onOpenChange,
  onAssign,
  workOrderType,
  priority,
}: TechnicianAssignmentModalProps) {
  const [assignmentData, setAssignmentData] = useState({
    technicianId: "",
    scheduledDate: new Date(),
    estimatedHours: "2",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState<Technician[]>(
    [],
  );
  const [specializationFilter, setSpecializationFilter] = useState("all");

  // Mock technicians data
  useEffect(() => {
    if (open) {
      setIsLoading(true);

      // Simulate API call to get technicians
      setTimeout(() => {
        const mockTechnicians: Technician[] = [
          {
            id: "TECH-001",
            name: "Mike Johnson",
            specialization: "IT Equipment",
            availability: "Available",
            currentLoad: 2,
            skills: ["Printers", "Computers", "Networks"],
          },
          {
            id: "TECH-002",
            name: "Sarah Williams",
            specialization: "HVAC",
            availability: "Busy",
            currentLoad: 4,
            skills: ["Air Conditioning", "Ventilation", "Heating"],
          },
          {
            id: "TECH-003",
            name: "Robert Davis",
            specialization: "Electrical",
            availability: "Available",
            currentLoad: 1,
            skills: ["Wiring", "Lighting", "Power Systems"],
          },
          {
            id: "TECH-004",
            name: "Jennifer Lee",
            specialization: "Plumbing",
            availability: "Off Duty",
            currentLoad: 0,
            skills: ["Pipes", "Fixtures", "Water Systems"],
          },
          {
            id: "TECH-005",
            name: "David Wilson",
            specialization: "IT Equipment",
            availability: "Available",
            currentLoad: 3,
            skills: ["Printers", "Servers", "Software"],
          },
        ];

        setTechnicians(mockTechnicians);
        setFilteredTechnicians(mockTechnicians);

        // Auto-select the best technician based on work order type and priority
        const relevantSpecialization = getRelevantSpecialization(workOrderType);
        const availableTechs = mockTechnicians.filter(
          (tech) =>
            tech.availability === "Available" &&
            tech.specialization === relevantSpecialization,
        );

        if (availableTechs.length > 0) {
          // Sort by current load (ascending)
          availableTechs.sort((a, b) => a.currentLoad - b.currentLoad);

          // If priority is high or critical, select the first available
          if (priority === "High" || priority === "Critical") {
            setAssignmentData((prev) => ({
              ...prev,
              technicianId: availableTechs[0].id,
            }));
          }
        }

        setIsLoading(false);
      }, 1000);
    }
  }, [open, workOrderType, priority]);

  // Filter technicians when specialization filter changes
  useEffect(() => {
    if (specializationFilter === "all") {
      setFilteredTechnicians(technicians);
    } else {
      setFilteredTechnicians(
        technicians.filter(
          (tech) => tech.specialization === specializationFilter,
        ),
      );
    }
  }, [specializationFilter, technicians]);

  const getRelevantSpecialization = (workOrderType: string) => {
    // Map work order types to technician specializations
    if (
      workOrderType.toLowerCase().includes("printer") ||
      workOrderType.toLowerCase().includes("computer")
    ) {
      return "IT Equipment";
    } else if (
      workOrderType.toLowerCase().includes("hvac") ||
      workOrderType.toLowerCase().includes("air")
    ) {
      return "HVAC";
    } else if (
      workOrderType.toLowerCase().includes("electrical") ||
      workOrderType.toLowerCase().includes("light")
    ) {
      return "Electrical";
    } else if (
      workOrderType.toLowerCase().includes("plumbing") ||
      workOrderType.toLowerCase().includes("water")
    ) {
      return "Plumbing";
    }
    return "IT Equipment"; // Default for this example
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Busy":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Off Duty":
        return "bg-[#f5f5f5] text-[#9e9e9e] border-[#9e9e9e]";
      default:
        return "";
    }
  };

  const handleChange = (field: string, value: any) => {
    setAssignmentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const selectedTechnician = technicians.find(
        (tech) => tech.id === assignmentData.technicianId,
      );

      const assignmentDetails = {
        ...assignmentData,
        technicianName: selectedTechnician?.name || "",
        technicianSpecialization: selectedTechnician?.specialization || "",
      };

      onAssign(assignmentDetails);
      setIsLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Assign Technician
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            Select a technician and schedule the maintenance work.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e0e0e0] border-t-[#1976d2]"></div>
              <p className="mt-4 text-[#616161]">
                Finding available technicians...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-[#424242]">
                  Available Technicians
                </h3>
                <Select
                  value={specializationFilter}
                  onValueChange={setSpecializationFilter}
                >
                  <SelectTrigger className="w-[180px] border-[#e0e0e0] focus:ring-[#1976d2]">
                    <SelectValue placeholder="Filter by specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader className="bg-[#f5f5f5]">
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead className="text-[#616161]">Name</TableHead>
                      <TableHead className="text-[#616161]">
                        Specialization
                      </TableHead>
                      <TableHead className="text-[#616161]">Skills</TableHead>
                      <TableHead className="text-[#616161]">
                        Availability
                      </TableHead>
                      <TableHead className="text-[#616161]">
                        Current Load
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTechnicians.map((tech) => (
                      <TableRow
                        key={tech.id}
                        className={`hover:bg-[#fafafa] cursor-pointer ${assignmentData.technicianId === tech.id ? "bg-[#e3f2fd]" : ""}`}
                        onClick={() => handleChange("technicianId", tech.id)}
                      >
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {assignmentData.technicianId === tech.id && (
                              <CheckCircle2 className="h-5 w-5 text-[#1976d2]" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-[#424242]">
                          {tech.name}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          {tech.specialization}
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          <div className="flex flex-wrap gap-1">
                            {tech.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-[#f5f5f5] text-[#616161] border-[#e0e0e0]"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getAvailabilityColor(tech.availability)}
                          >
                            {tech.availability}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[#424242]">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-[#757575]" />
                            {tech.currentLoad} work orders
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate" className="text-[#424242]">
                    Scheduled Date <span className="text-[#f44336]">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-[#e0e0e0] focus:ring-[#1976d2]"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#757575]" />
                        {assignmentData.scheduledDate ? (
                          format(assignmentData.scheduledDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={assignmentData.scheduledDate}
                        onSelect={(date) => handleChange("scheduledDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedHours" className="text-[#424242]">
                    Estimated Hours <span className="text-[#f44336]">*</span>
                  </Label>
                  <Select
                    value={assignmentData.estimatedHours}
                    onValueChange={(value) =>
                      handleChange("estimatedHours", value)
                    }
                  >
                    <SelectTrigger className="border-[#e0e0e0] focus:ring-[#1976d2]">
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours (Full day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#1976d2] hover:bg-[#1565c0]"
            disabled={isLoading || !assignmentData.technicianId}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Assigning...
              </>
            ) : (
              "Assign Technician"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
