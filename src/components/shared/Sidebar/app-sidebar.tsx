import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { SidebarUser } from "./sidebar-user"

// This is sample data.
const data = {
  navMain: [
    {
      title: "My Profile",
      url: "/dashboard",
      isActive: true,
    },
    {
      title: "ALl Blogs",
      url: "/dashboard/manageBlogs",
      isActive: true,
    },
    {
      title: "All Projects",
      url: "/dashboard/projects",
      isActive: true,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="lg:px-2 px-1" {...props}>
      <SidebarHeader>
        <span>Ridoy</span>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
              <SidebarMenu key={item.title}>
                  <SidebarMenuItem >
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
        ))}
      </SidebarContent>
       <SidebarFooter className="p-1 lg:p-4">
        <SidebarUser></SidebarUser>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
