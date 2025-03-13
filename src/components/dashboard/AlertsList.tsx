import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
}

interface AlertsListProps {
  className?: string;
}

export function AlertsList({ className }: AlertsListProps) {
  const alerts: Alert[] = [
    {
      id: "alert-1",
      title: "HVAC System Failure",
      description: "Main building 3rd floor HVAC system has stopped working",
      severity: "critical",
      timestamp: "10 minutes ago",
    },
    {
      id: "alert-2",
      title: "Low Inventory Alert",
      description: "Air filters inventory below minimum threshold",
      severity: "warning",
      timestamp: "1 hour ago",
    },
    {
      id: "alert-3",
      title: "Scheduled Maintenance",
      description: "Elevator maintenance scheduled for tomorrow",
      severity: "info",
      timestamp: "3 hours ago",
    },
  ];

  const getSeverityIcon = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-[#f44336]" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-[#ff9800]" />;
      case "info":
        return <CheckCircle className="h-5 w-5 text-[#1976d2]" />;
      default:
        return null;
    }
  };

  const getSeverityClass = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "border-l-4 border-[#f44336] bg-[#ffebee]";
      case "warning":
        return "border-l-4 border-[#ff9800] bg-[#fff3e0]";
      case "info":
        return "border-l-4 border-[#1976d2] bg-[#e3f2fd]";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-[#e0e0e0] shadow-sm",
        className,
      )}
    >
      <div className="p-4 border-b border-[#e0e0e0] flex justify-between items-center">
        <h3 className="text-lg font-medium text-[#212121]">
          Maintenance Alerts
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="border-[#1976d2] text-[#1976d2] hover:bg-[#e3f2fd] hover:text-[#1565c0]"
        >
          View All
        </Button>
      </div>
      <div className="p-4 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn("p-3 rounded-md", getSeverityClass(alert.severity))}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-[#212121]">{alert.title}</h4>
                  <span className="text-xs text-[#757575]">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-sm text-[#757575] mt-1">
                  {alert.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsList;
