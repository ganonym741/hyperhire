import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left',
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
          : 'text-sidebar-foreground hover:bg-sidebar-hover'
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-sm">{label}</span>
    </button>
  );
};

export default SidebarItem;
