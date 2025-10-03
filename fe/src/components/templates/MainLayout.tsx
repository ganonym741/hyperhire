'use client';

import { ReactNode, useState } from 'react';
import Sidebar from '../organisms/Sidebar';
import IconButton from '../atoms/IconButton';
import { Menu } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center gap-4 p-4 border-b border-border bg-card">
          <IconButton variant="ghost" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </IconButton>
          <h1 className="text-lg font-semibold">System Management</h1>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
