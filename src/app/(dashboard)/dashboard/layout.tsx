import { AppSidebar } from "@/components/shared/Sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserSession } from "@/helpers/getUserSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {

  const session =  await getUserSession();
  console.log(session?.user)
  if(!session || session?.user?.email !== process.env.NEXT_PUBLIC_OWNER_EMAIL){
    redirect("/unauthorized");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Link href="/">Back</Link>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
