import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, HelpCircle, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  className?: string;
}

interface User {
  name: string;
  email: string;
  role: string;
}

export function TopBar({ className }: TopBarProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const handleLogout = () => {
    navigate("/logout");
  };

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "JD";

  return (
    <div
      className={`flex items-center justify-between p-4 bg-white border-b border-[#e0e0e0] ${className}`}
    >
      <div className="relative w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#9e9e9e]" />
        <Input
          placeholder="Search..."
          className="pl-8 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-[#757575] hover:bg-[#f5f5f5] hover:text-[#424242]"
        >
          <Bell size={20} />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#f44336] text-white">
            3
          </Badge>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-[#757575] hover:bg-[#f5f5f5] hover:text-[#424242]"
        >
          <HelpCircle size={20} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar className="border-2 border-[#1976d2]">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=facility-manager" />
                <AvatarFallback className="bg-[#e3f2fd] text-[#1976d2]">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-[#212121]">
                  {user?.name || "John Doe"}
                </p>
                <p className="text-xs text-[#757575]">
                  {user?.role || "Administrator"}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-[#e0e0e0]">
            <div className="p-2">
              <p className="text-sm font-medium text-[#212121]">
                {user?.name || "John Doe"}
              </p>
              <p className="text-xs text-[#757575]">
                {user?.email || "admin@example.com"}
              </p>
            </div>
            <DropdownMenuSeparator className="bg-[#e0e0e0]" />
            <DropdownMenuItem
              className="text-[#f44336] focus:bg-[#ffebee] focus:text-[#d32f2f] cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TopBar;
