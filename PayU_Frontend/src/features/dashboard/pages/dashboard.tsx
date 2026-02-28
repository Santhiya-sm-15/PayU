import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import Sidebar from "../components/sidebar";
import UploadBox from "../components/upload_box";

type DocStatus = "success" | "pending" | "failed";
type DocType = "Invoice" | "Purchase Order";

interface StatItem { label: string; value: number | string; sub: string; accentClass: string; }
interface ActivityRow { id: number; file: string; type: DocType; vendor: string; amount: string; status: DocStatus; time: string; }

const STATS: StatItem[] = [
  { label: "Total Documents", value: 0, sub: "All time", accentClass: "border-t-blue-600" },
  { label: "Processed", value: 0, sub: "0% success rate", accentClass: "border-t-green-600" },
  { label: "Pending Review", value: 0, sub: "Awaiting approval", accentClass: "border-t-amber-500" },
  { label: "Failed", value: 0, sub: "Needs attention", accentClass: "border-t-red-500" },
];

const RECENT_ACTIVITY: ActivityRow[] = [];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function StatusBadge({ status }: { status: DocStatus }) {
  const config: Record<DocStatus, string> = {
    success: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };
  return (<span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${config[status]}`}>{status}</span>);
}

function StatCard({ label, value, sub, accentClass }: StatItem) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-t-4 ${accentClass} p-5`}>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
      </p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <Navigate to="/" />;

  const initials = user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={{ ...user, initials }} />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-900 text-xl transition-colors cursor-pointer">☰</button>
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">{initials}</div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <p className="text-2xl font-bold text-gray-800">{getGreeting()}, {user.name.split(" ")[0]} 👋</p>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Upload Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadBox type="Invoice" accentClass="border-t-blue-600" iconBg="bg-blue-50 text-blue-600" icon="🧾" accept=".pdf,.png,.jpg,.jpeg,.docx" />
            <UploadBox type="Purchase Order" accentClass="border-t-violet-600" iconBg="bg-violet-50 text-violet-600" icon="📋" accept=".pdf,.png,.jpg,.jpeg,.docx" />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-100">
                    <th className="pb-2 font-medium">File</th>
                    <th className="pb-2 font-medium">Vendor</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ACTIVITY.length===0 && <tr><td colSpan={5} className="text-center p-4">No activity found</td></tr>}
                  {RECENT_ACTIVITY.length>0 && RECENT_ACTIVITY.map((row) => (
                    <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-medium text-gray-700">{row.file}</td>
                      <td className="py-3 text-gray-500">{row.vendor}</td>
                      <td className="py-3 text-gray-700 font-medium">{row.amount}</td>
                      <td className="py-3"><StatusBadge status={row.status} /></td>
                      <td className="py-3 text-gray-400">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;