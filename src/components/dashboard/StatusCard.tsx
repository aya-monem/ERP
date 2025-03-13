import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
  color?: string;
}

export function StatusCard({
  title,
  value,
  icon,
  trend,
  className,
  color = "#1976d2",
}: StatusCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-4 border border-[#e0e0e0] shadow-sm",
        className,
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-[#757575]">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-[#212121]">{value}</h3>
          {trend && (
            <p
              className={`text-xs flex items-center mt-1 ${trend.positive ? "text-[#4caf50]" : "text-[#f44336]"}`}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div
          className="p-2 rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          <div className="text-[${color}]">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default StatusCard;
