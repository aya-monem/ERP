import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  FileText,
  Home as Building,
  Box,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/",
      active: currentPath === "/",
    },
    {
      icon: FileText,
      label: "Work Orders",
      path: "/work-orders",
      active: currentPath === "/work-orders",
    },
    {
      icon: Building,
      label: "Facilities",
      path: "/facilities",
      active: currentPath === "/facilities",
    },
    {
      icon: Box,
      label: "Assets",
      path: "/assets",
      active: currentPath === "/assets",
    },
    {
      icon: Package,
      label: "Inventory",
      path: "/inventory",
      active: currentPath === "/inventory",
    },
    {
      icon: BarChart2,
      label: "Reports",
      path: "/reports",
      active: currentPath === "/reports",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      active: currentPath === "/settings",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r border-[#e0e0e0] transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <div className="font-bold text-xl text-[#1976d2]">FacilityHub</div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-[#757575]"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <Separator className="bg-[#e0e0e0]" />
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-4",
                  item.active
                    ? "bg-[#e3f2fd] text-[#1976d2] hover:bg-[#bbdefb] hover:text-[#1565c0]"
                    : "text-[#757575] hover:bg-[#f5f5f5] hover:text-[#424242]",
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon
                  size={20}
                  className={item.active ? "text-[#1976d2]" : "text-[#757575]"}
                />
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
