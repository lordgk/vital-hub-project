
import { useState } from "react";
import { Bell, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const Header = ({ toggleSidebar, isSidebarCollapsed }: HeaderProps) => {
  const { userEmail, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications] = useState(3); // Mock notification count

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getInitials = () => {
    if (userName) {
      return userName.split(' ').map(name => name[0]).join('').toUpperCase();
    }
    return userEmail ? userEmail[0].toUpperCase() : 'U';
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-20 h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2 md:hidden"
        >
          {isSidebarCollapsed ? <Menu /> : <X />}
        </Button>
        <h1 className="text-xl font-bold text-gray-800">VitalHub HMS</h1>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-medium bg-red-500 text-white rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="font-semibold text-sm px-2 py-1.5">Notifications</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New patient registration</DropdownMenuItem>
            <DropdownMenuItem>Appointment reminder</DropdownMenuItem>
            <DropdownMenuItem>System update completed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/settings")}
        >
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2" size="sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block max-w-[100px] truncate">
                {userName || userEmail}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="font-medium text-sm px-2 py-1.5">
              {userName && <div>{userName}</div>}
              <div className="text-xs text-muted-foreground">{userEmail}</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
