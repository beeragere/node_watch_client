import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react";
import Logo from "@/assets/images/logo.svg";
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
import { Separator } from "@/components/ui/separator";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Orders", url: "/orders", icon: Inbox },
  { title: "Food Menu", url: "/menu", icon: Calendar },
  { title: "Riders", url: "/riders", icon: User },
  { title: "Restaurant", url: "/restaurant", icon: Search },
  { title: "Report", url: "/report", icon: Settings },
  { title: "Message", url: "/messages", icon: Inbox },
];

const otherItems = [
  { title: "Marketing", url: "/marketing", icon: Calendar },
  { title: "Support", url: "/support", icon: Inbox },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
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
            <span className="font-medium text-sm">Kazi Mahbub</span>
            <span className="text-xs text-muted-foreground">Super Admin</span>
          </div>
          <Settings className="ml-auto h-4 w-4" />
        </div>

        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-md"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        {/* Others */}
        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-md"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
