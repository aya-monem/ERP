import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, Wrench, User, FileText } from "lucide-react";

interface MaintenanceHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
}

export default function MaintenanceHistoryModal({
  open,
  onOpenChange,
  asset,
}: MaintenanceHistoryModalProps) {
  if (!asset) return null;

  // Mock maintenance history data
  const maintenanceHistory = [
    {
      id: "MH-1001",
      date: "2023-05-15",
      type: "Preventive",
      description: "Regular quarterly maintenance check",
      technician: "Mike Johnson",
      status: "Completed",
      duration: "2 hours",
      cost: "$150",
    },
    {
      id: "MH-1002",
      date: "2023-01-10",
      type: "Corrective",
      description: "Replaced faulty component",
      technician: "Sarah Williams",
      status: "Completed",
      duration: "4 hours",
      cost: "$350",
    },
    {
      id: "MH-1003",
      date: "2022-10-05",
      type: "Inspection",
      description: "Annual safety inspection",
      technician: "Robert Davis",
      status: "Completed",
      duration: "1 hour",
      cost: "$75",
    },
    {
      id: "MH-1004",
      date: "2022-07-22",
      type: "Preventive",
      description: "Regular quarterly maintenance check",
      technician: "Mike Johnson",
      status: "Completed",
      duration: "2 hours",
      cost: "$150",
    },
    {
      id: "MH-1005",
      date: "2022-04-18",
      type: "Emergency",
      description: "Emergency repair after system failure",
      technician: "Jennifer Lee",
      status: "Completed",
      duration: "6 hours",
      cost: "$750",
    },
  ];

  const getMaintenanceTypeColor = (type: string) => {
    switch (type) {
      case "Preventive":
        return "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]";
      case "Corrective":
        return "bg-[#fff3e0] text-[#ff9800] border-[#ff9800]";
      case "Inspection":
        return "bg-[#e8f5e9] text-[#4caf50] border-[#4caf50]";
      case "Emergency":
        return "bg-[#ffebee] text-[#f44336] border-[#f44336]";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1976d2]">
            Maintenance History
          </DialogTitle>
          <DialogDescription className="text-[#757575]">
            View maintenance history for {asset.name} ({asset.id}).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 bg-[#f5f5f5] p-4 rounded-md">
            <div>
              <p className="text-sm font-medium text-[#757575]">Asset</p>
              <p className="font-medium text-[#212121]">{asset.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#757575]">Type</p>
              <p className="text-[#424242]">{asset.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#757575]">Facility</p>
              <p className="text-[#424242]">{asset.facility}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#757575]">
                Last Maintenance
              </p>
              <p className="text-[#424242]">{asset.lastMaintenance}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#757575]">
                Next Maintenance
              </p>
              <p className="text-[#424242]">{asset.nextMaintenance}</p>
            </div>
          </div>

          <div className="rounded-md border border-[#e0e0e0] overflow-hidden">
            <Table>
              <TableHeader className="bg-[#f5f5f5]">
                <TableRow>
                  <TableHead className="text-[#616161]">ID</TableHead>
                  <TableHead className="text-[#616161]">Date</TableHead>
                  <TableHead className="text-[#616161]">Type</TableHead>
                  <TableHead className="text-[#616161]">Description</TableHead>
                  <TableHead className="text-[#616161]">Technician</TableHead>
                  <TableHead className="text-[#616161]">Duration</TableHead>
                  <TableHead className="text-[#616161]">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceHistory.map((record) => (
                  <TableRow key={record.id} className="hover:bg-[#fafafa]">
                    <TableCell className="font-medium text-[#212121]">
                      {record.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-[#757575]" />
                        <span className="text-[#424242]">{record.date}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getMaintenanceTypeColor(record.type)}
                      >
                        {record.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#424242]">
                      {record.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-[#757575]" />
                        <span className="text-[#424242]">
                          {record.technician}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-[#757575]" />
                        <span className="text-[#424242]">
                          {record.duration}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#424242]">
                      {record.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-[#f5f5f5] p-4 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-[#757575]">
                  Total Records
                </p>
                <p className="font-medium text-[#212121]">
                  {maintenanceHistory.length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">Total Cost</p>
                <p className="font-medium text-[#212121]">
                  $
                  {maintenanceHistory
                    .reduce(
                      (sum, record) =>
                        sum + parseFloat(record.cost.replace(/[^0-9.]/g, "")),
                      0,
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#757575]">
                  Total Hours
                </p>
                <p className="font-medium text-[#212121]">
                  {maintenanceHistory.reduce(
                    (sum, record) =>
                      sum + parseInt(record.duration.split(" ")[0]),
                    0,
                  )}{" "}
                  hours
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
          >
            <FileText className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#e0e0e0] text-[#616161] hover:bg-[#f5f5f5] hover:text-[#424242]"
          >
            Close
          </Button>
          <Button className="bg-[#1976d2] hover:bg-[#1565c0]">
            <Wrench className="mr-2 h-4 w-4" /> Schedule Maintenance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
