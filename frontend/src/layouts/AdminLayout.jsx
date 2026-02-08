import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function AdminLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 p-6">
        <Outlet />
      </main>
    </>
  );
}
