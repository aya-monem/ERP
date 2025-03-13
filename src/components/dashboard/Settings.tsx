import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  User,
  Users,
  Bell,
  Shield,
  Database,
  Mail,
  Smartphone,
  Globe,
  Moon,
  Sun,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>

          <Tabs defaultValue="profile" className="mb-6">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-6">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center">
                <Users className="mr-2 h-4 w-4" /> Users
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center">
                <Database className="mr-2 h-4 w-4" /> Integrations
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center">
                <Sun className="mr-2 h-4 w-4" /> Appearance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account profile information and email address.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" defaultValue="Facility Manager" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="(555) 123-4567" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=facility-manager" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                      <div className="text-center">
                        <Badge>Administrator</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage users and their access permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="relative w-64">
                        <Input placeholder="Search users..." />
                      </div>
                      <Button>
                        <Users className="mr-2 h-4 w-4" /> Add User
                      </Button>
                    </div>

                    <div className="border rounded-md">
                      <div className="flex items-center p-4 border-b">
                        <div className="flex items-center flex-1">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Mike Johnson</p>
                            <p className="text-sm text-muted-foreground">
                              mike.j@example.com
                            </p>
                          </div>
                        </div>
                        <Badge>Technician</Badge>
                        <Button variant="ghost" size="sm" className="ml-4">
                          Edit
                        </Button>
                      </div>

                      <div className="flex items-center p-4 border-b">
                        <div className="flex items-center flex-1">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" />
                            <AvatarFallback>SW</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Sarah Williams</p>
                            <p className="text-sm text-muted-foreground">
                              sarah.w@example.com
                            </p>
                          </div>
                        </div>
                        <Badge>Manager</Badge>
                        <Button variant="ghost" size="sm" className="ml-4">
                          Edit
                        </Button>
                      </div>

                      <div className="flex items-center p-4 border-b">
                        <div className="flex items-center flex-1">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3" />
                            <AvatarFallback>RD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Robert Davis</p>
                            <p className="text-sm text-muted-foreground">
                              robert.d@example.com
                            </p>
                          </div>
                        </div>
                        <Badge>Technician</Badge>
                        <Button variant="ghost" size="sm" className="ml-4">
                          Edit
                        </Button>
                      </div>

                      <div className="flex items-center p-4">
                        <div className="flex items-center flex-1">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user4" />
                            <AvatarFallback>JL</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Jennifer Lee</p>
                            <p className="text-sm text-muted-foreground">
                              jennifer.l@example.com
                            </p>
                          </div>
                        </div>
                        <Badge>Administrator</Badge>
                        <Button variant="ghost" size="sm" className="ml-4">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Work Order Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates when work orders change status
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Maintenance Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified about critical maintenance issues
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Inventory Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications when inventory items are low
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Report Generation</p>
                        <p className="text-sm text-muted-foreground">
                          Receive scheduled reports via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      In-App Notifications
                    </h3>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Task Assignments</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications when you're assigned a task
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Comments & Mentions</p>
                        <p className="text-sm text-muted-foreground">
                          Alerts when someone mentions you in comments
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Announcements</p>
                        <p className="text-sm text-muted-foreground">
                          Important system-wide announcements
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and authentication methods.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <Separator />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>
                        <Save className="mr-2 h-4 w-4" /> Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Two-Factor Authentication
                    </h3>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          Enable Two-Factor Authentication
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Management</h3>
                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Chrome on Windows • IP: 192.168.1.1
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Started: Today at 9:30 AM
                          </p>
                        </div>
                        <Badge>Active</Badge>
                      </div>

                      <Button variant="outline">
                        Log Out of All Other Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Connect with other systems and services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mr-4">
                          <Database className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Building Management System
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Connect to your BMS for real-time data
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center mr-4">
                          <Mail className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Email Service</p>
                          <p className="text-sm text-muted-foreground">
                            Send notifications via email
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center mr-4">
                          <Smartphone className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Send alerts via text message
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center mr-4">
                          <Globe className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Weather Service</p>
                          <p className="text-sm text-muted-foreground">
                            Get weather data for facilities
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the application.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <Separator />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-background">
                        <Sun className="h-6 w-6" />
                        <p className="font-medium">Light</p>
                      </div>
                      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-slate-950 text-white">
                        <Moon className="h-6 w-6" />
                        <p className="font-medium">Dark</p>
                      </div>
                      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer">
                        <div className="flex">
                          <Sun className="h-6 w-6" />
                          <Moon className="h-6 w-6" />
                        </div>
                        <p className="font-medium">System</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Dashboard Layout</h3>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compact Mode</p>
                        <p className="text-sm text-muted-foreground">
                          Use a more compact layout to fit more content
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Quick Actions</p>
                        <p className="text-sm text-muted-foreground">
                          Display quick action buttons on dashboard
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
