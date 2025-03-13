import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  Download,
  BarChart,
  PieChart,
  LineChart,
  Table as TableIcon,
  FileText,
  Share2,
} from "lucide-react";
import ChartPlaceholder from "./ChartPlaceholder";

export default function Reports() {
  const reports = [
    {
      id: "rep-1",
      name: "Work Order Summary",
      type: "Dashboard",
      lastRun: "2023-06-10",
      icon: BarChart,
    },
    {
      id: "rep-2",
      name: "Asset Maintenance History",
      type: "Table",
      lastRun: "2023-06-08",
      icon: TableIcon,
    },
    {
      id: "rep-3",
      name: "Inventory Status",
      type: "Dashboard",
      lastRun: "2023-06-09",
      icon: PieChart,
    },
    {
      id: "rep-4",
      name: "Energy Consumption",
      type: "Chart",
      lastRun: "2023-06-05",
      icon: LineChart,
    },
    {
      id: "rep-5",
      name: "Facility Inspection Report",
      type: "Document",
      lastRun: "2023-05-28",
      icon: FileText,
    },
    {
      id: "rep-6",
      name: "Maintenance Cost Analysis",
      type: "Dashboard",
      lastRun: "2023-06-01",
      icon: BarChart,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Reports</h1>
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Create Report
            </Button>
          </div>

          <Tabs defaultValue="saved" className="mb-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="saved">Saved Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {reports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-full">
                          <report.icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <CardDescription>Type: {report.type}</CardDescription>
                      <CardDescription>
                        Last run: {report.lastRun}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Download className="mr-2 h-4 w-4" /> Run
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="mt-6">
              <p className="text-muted-foreground mb-6">
                Configure reports to run automatically and be delivered to
                specified recipients.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Maintenance Summary</CardTitle>
                    <CardDescription>
                      Runs every Monday at 8:00 AM
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Recipients</p>
                        <p className="text-sm text-muted-foreground">
                          maintenance@example.com, manager@example.com
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Format</p>
                        <p className="text-sm text-muted-foreground">
                          PDF, Excel
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                        >
                          Disable
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Facility Status</CardTitle>
                    <CardDescription>
                      Runs on the 1st of every month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Recipients</p>
                        <p className="text-sm text-muted-foreground">
                          facilities@example.com, director@example.com
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Format</p>
                        <p className="text-sm text-muted-foreground">
                          PDF, Dashboard
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                        >
                          Disable
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-6">
              <div className="bg-card rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-medium mb-4">
                  Generate Custom Report
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select defaultValue="work-orders">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="work-orders">Work Orders</SelectItem>
                        <SelectItem value="assets">Assets</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            From
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            To
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select defaultValue="dashboard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Grouping</label>
                    <Select defaultValue="none">
                      <SelectTrigger>
                        <SelectValue placeholder="Select grouping" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="facility">By Facility</SelectItem>
                        <SelectItem value="status">By Status</SelectItem>
                        <SelectItem value="priority">By Priority</SelectItem>
                        <SelectItem value="assignee">By Assignee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="outline" className="mr-2">
                    Save as Template
                  </Button>
                  <Button>Generate Report</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartPlaceholder title="Report Preview" height="h-96" />

                <Card>
                  <CardHeader>
                    <CardTitle>Report Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Report Name</p>
                      <p className="text-sm text-muted-foreground">
                        Work Order Summary - Custom
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Data Points</p>
                      <p className="text-sm text-muted-foreground">
                        128 work orders included
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Date Range</p>
                      <p className="text-sm text-muted-foreground">
                        May 1, 2023 - June 10, 2023
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Key Insights</p>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>75% of work orders completed on time</li>
                        <li>Average resolution time: 3.2 days</li>
                        <li>Most common issue: HVAC maintenance</li>
                        <li>Highest priority facility: Main Building</li>
                      </ul>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
