import {
    LayoutDashboard,
    Users,
    User,
    Settings,
    Folder,
    Key,
    Plus,
    Eye,
    Calendar,
    Contact,
} from 'lucide-react';
import Link from 'next/link';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const AdminSidebar = () => {
    return (
        <Sidebar className="h-screen pt-16 border-r bg-muted/40">
            <SidebarContent>
                {/* Header */}
                <div className="flex items-center justify-center w-full h-[60px]">
                    <h1 className="text-2xl font-extrabold tracking-wide text-primary transition-all duration-300">
                        CODEGROW
                    </h1>
                </div>
                <div className="flex h-[60px] items-center border-b px-4">
                    <Link href="/admin" className="w-full">
                        <h2 className="text-base font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                            Dashboard
                        </h2>
                    </Link>
                </div>
                <SidebarGroup>
                    <Accordion type="multiple" className="w-full">
                        {/* Pages Section */}
                        <AccordionItem value="pages" className="border-b-0">
                            <AccordionTrigger className="px-4 py-2 text-muted-foreground text-xs font-medium uppercase tracking-wide hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                <div className="flex w-full items-center justify-between">
                                    Pages
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                                <SidebarGroupContent>
                                    <SidebarMenu className="pl-2 space-y-1">
                                        {/* Users */}
                                        <AccordionItem value="users" className="border-b-0">
                                            <AccordionTrigger className="py-1 pl-2 pr-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Users className="h-4 w-4" />
                                                        Users
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-0 pl-6">
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/overviewuser"
                                                                className="flex items-center gap-2 px-2 py-1 text-sm"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                Overview
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/adduser"
                                                                className="flex items-center gap-2 px-2 py-1 text-sm"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                                Add User
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* User Profile */}
                                        <AccordionItem value="user-profile" className="border-b-0">
                                            <AccordionTrigger className="py-1 pl-2 pr-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <User className="h-4 w-4" />
                                                        User Profile
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-0 pl-6">
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/users"
                                                                className="flex items-center gap-2 px-2 py-1 text-sm"
                                                            >
                                                                <Users className="h-4 w-4" />
                                                                Users
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/contact"
                                                                className="flex items-center gap-2 px-2 py-1 text-sm"
                                                            >
                                                                <Contact className="h-4 w-4" />
                                                                Contact
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Account */}
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href="/admin/account"
                                                    className="flex items-center gap-2 px-2 py-1 text-sm"
                                                >
                                                    <Settings className="h-4 w-4" />
                                                    Account
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        {/* Projects */}
                                        <AccordionItem value="projects" className="border-b-0">
                                            <AccordionTrigger className="py-1 pl-2 pr-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                                <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Folder className="h-4 w-4" />
                                                        Projects
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-0 pl-6">
                                                <SidebarMenu>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/overviewproject"
                                                                className="flex items-center gap-2 px-2 py-1 text-sm"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                Overview
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <Link
                                                                href="/admin/calender"
                                                                className="flex items-center gap-2 px-2 py-1 text-sm"
                                                            >
                                                                <Calendar className="h-4 w-4" />
                                                                Calendar
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Authentication */}
                        <AccordionItem value="auth" className="border-b-0">
                            <AccordionTrigger className="px-4 py-2 text-muted-foreground text-xs font-medium uppercase tracking-wide hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                <div className="flex w-full items-center justify-between">
                                    Authentication
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                                <SidebarGroupContent>
                                    <SidebarMenu className="pl-2">
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href="#"
                                                    className="flex items-center gap-2 px-2 py-1 text-sm"
                                                >
                                                    <Key className="h-4 w-4" />
                                                    API Keys
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SidebarGroup>

                {/* Separator */}
                <SidebarSeparator className="my-4" />

                {/* Layouts Section */}
                <SidebarMenu className="pl-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="#" className="flex items-center gap-2 px-2 py-1 text-sm">
                                <LayoutDashboard className="h-4 w-4" />
                                Layouts
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
};
