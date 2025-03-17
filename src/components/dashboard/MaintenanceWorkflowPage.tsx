import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MaintenanceWorkflow from "./MaintenanceWorkflow";

export default function MaintenanceWorkflowPage() {
  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <MaintenanceWorkflow />
        </main>
      </div>
    </div>
  );
}
