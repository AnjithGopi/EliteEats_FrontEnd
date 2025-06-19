import Sidebar from "../sidebar";
import DashContent from "./dashcontent";

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 min-h-screen sticky top-0 z-50">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <DashContent />
      </div>
    </div>
  );
}

export default Dashboard;
