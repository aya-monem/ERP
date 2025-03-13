import { Suspense } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import StatusCard from "./StatusCard";
import WorkOrdersTable from "./WorkOrdersTable";
import ChartPlaceholder from "./ChartPlaceholder";
import AlertsList from "./AlertsList";
import { FileText, Home, Box, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-[#212121] mb-6">
            Dashboard Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatusCard
              title="Total Work Orders"
              value="128"
              icon={<FileText className="h-5 w-5 text-[#1976d2]" />}
              trend={{ value: "12% this week", positive: true }}
              color="#1976d2"
            />
            <StatusCard
              title="Facilities"
              value="24"
              icon={<Home className="h-5 w-5 text-[#4caf50]" />}
              color="#4caf50"
            />
            <StatusCard
              title="Assets"
              value="1,284"
              icon={<Box className="h-5 w-5 text-[#ff9800]" />}
              trend={{ value: "3 new today", positive: true }}
              color="#ff9800"
            />
            <StatusCard
              title="Critical Issues"
              value="7"
              icon={<AlertTriangle className="h-5 w-5 text-[#f44336]" />}
              trend={{ value: "2 more than yesterday", positive: false }}
              color="#f44336"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <ChartPlaceholder
              title="Work Order Status"
              className="lg:col-span-1"
            />
            <ChartPlaceholder
              title="Facility Usage"
              className="lg:col-span-2"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WorkOrdersTable className="lg:col-span-2" />
            <AlertsList className="lg:col-span-1" />
          </div>
        </main>
      </div>
    </div>
  );
}
