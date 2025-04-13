
import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <main className="flex-1 p-6">
          {children}
        </main>
        <footer className="py-4 px-6 text-center text-sm text-gray-500 border-t">
          <p>© 2023 VitalHub Hospital Management System</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
