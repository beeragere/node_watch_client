import Logo from "@/assets/images/logo.svg";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/Auth.context";
import { Calendar, Home, Inbox, Settings, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Servers", url: "/servers", icon: Inbox },
  { title: "Cases", url: "/cases", icon: Calendar },
  { title: "Vendors", url: "/vendors", icon: User },
];

const otherItems = [
  { title: "Support", url: "/support", icon: Inbox },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const renderMenuItems = (items: typeof mainItems) => {
    return items.map((item) => {
      const isActive = location.pathname === item.url;

      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <button
              onClick={() => navigate(item.url)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left
              transition-colors
              ${
                isActive
                  ? "bg-primary text-white" // 🔹 Active: solid highlight, no hover effect
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <Sidebar className="w-64 border-r">
      <SidebarContent className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2 font-bold text-xl">
          <img src={Logo} alt="Node Watch" className="w-8 h-8" />
          Node Watch
        </div>

        {/* User profile */}
        <div className="p-4 flex items-center gap-3 rounded-lg border">
          <img src={Logo} alt="User" className="h-10 w-10 rounded-full" />
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.role?.toLowerCase()}
            </span>
          </div>
          <Settings className="ml-auto h-4 w-4" />
        </div>

        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(mainItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        {/* Others */}
        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(otherItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
