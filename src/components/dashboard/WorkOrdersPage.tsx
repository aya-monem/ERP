import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import WorkOrders from "./WorkOrders";

export default function WorkOrdersPage() {
  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-[#212121] mb-6">
            Work Orders
          </h1>
          <WorkOrders />
        </main>
      </div>
    </div>
  );
}
