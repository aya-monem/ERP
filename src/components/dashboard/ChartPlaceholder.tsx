import { cn } from "@/lib/utils";

interface ChartPlaceholderProps {
  title: string;
  className?: string;
  height?: string;
  children?: React.ReactNode;
}

export function ChartPlaceholder({
  title,
  className,
  height = "h-64",
  children,
}: ChartPlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-[#e0e0e0] shadow-sm",
        className,
      )}
    >
      <div className="p-4 border-b border-[#e0e0e0]">
        <h3 className="text-lg font-medium text-[#212121]">{title}</h3>
      </div>
      <div className={`p-4 flex items-center justify-center ${height}`}>
        {children || (
          <div className="text-center text-[#757575]">
            <p>Chart visualization would appear here</p>
            <p className="text-sm">
              (Using a charting library like Recharts or Chart.js)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChartPlaceholder;
