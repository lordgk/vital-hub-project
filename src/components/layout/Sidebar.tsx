
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  Calendar, 
  ClipboardList, 
  Home, 
  Menu, 
  Settings, 
  User, 
  Users, 
  Building2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Patients", href: "/patients", icon: User },
  { name: "Doctors", href: "/doctors", icon: Users },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Departments", href: "/departments", icon: Building2 },
  { name: "Medical Records", href: "/records", icon: ClipboardList },
  { name: "Analytics", href: "/analytics", icon: Activity },
  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "min-h-screen bg-white border-r border-border transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center">
            <span className="font-bold text-hospital-700 text-xl">Vital</span>
            <span className="font-medium text-hospital-500 ml-0.5">Hub</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="flex flex-col justify-between h-full py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-md",
                "transition-colors duration-200 ease-in-out",
                location.pathname === item.href
                  ? "bg-hospital-50 text-hospital-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-hospital-600",
                collapsed && "justify-center"
              )}
            >
              <item.icon
                className={cn("flex-shrink-0", collapsed ? "h-6 w-6" : "h-5 w-5 mr-3")}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="px-3 mt-auto">
          {!collapsed && (
            <div className="bg-hospital-50 rounded-lg p-3 text-xs text-hospital-700">
              <p className="font-medium">Need help?</p>
              <p className="mt-1">Contact support at ext. 1234 or email support@vitalhub.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
