import { X, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import IconButton from "../atoms/IconButton";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMenuExpansion } from "@/store/menuSlice";
import { Menu } from "@/types/menu";

import CloitLogo from "@assets/cloit.svg";
import LightFolderIcon from "@assets/light-folder.svg";
import DarkFolderIcon from "@assets/dark-folder.svg";
import WhiteSubmenuIcon from "@assets/white-submenu.svg";
import LightSubmenuIcon from "@assets/light-submenu.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const getIconForNode = (isActive: boolean, depth: number | undefined) => {
  switch (depth) {
    case 1:
      return isActive ? <LightFolderIcon /> : <DarkFolderIcon />;
    case 2:
      return isActive ? <WhiteSubmenuIcon /> : <LightSubmenuIcon />;
    default:
      return "-";
  }
};

const SidebarMenuItem = ({
  node,
  depth = 0,
  onToggleExpand,
  onNavigate,
  currentPath,
}: {
  node: Menu;
  depth?: number;
  onToggleExpand: (id: string) => void;
  onNavigate: (node: Menu) => void;
  currentPath: string;
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = node.menuExpanded;

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand(node.id);
    } else {
      onNavigate(node);
    }
  };

  const isRoot = depth === 1;
  const isChild = depth > 1;

  // Generate URL path from node name
  const nodePath =
    node.name === "Menu"
      ? "/menus"
      : `/menus/${node.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[&]/g, "and")}`;
  const isActive = currentPath === nodePath;

  return (
    <div
      className={
        isRoot && node.menuExpanded
          ? "bg-sidebar-hover text-sidebar-foreground rounded-[20px]"
          : ""
      }
    >
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
          // Parent styling
          isRoot &&
            !isExpanded &&
            "text-sidebar-foreground/70 hover:bg-sidebar-hover/40",
          // Child styling
          isChild &&
            isActive &&
            "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
          isChild &&
            !isActive &&
            "text-sidebar-foreground/60 hover:bg-sidebar-hover/30",
        )}
      >
        <span className="text-base flex-shrink-0">
          {getIconForNode(!!node.menuExpanded, node.depth)}
        </span>
        <span className="text-sm flex-1">{node.name}</span>
        {hasChildren && (
          <span className="text-xs text-sidebar-foreground/70">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
      </button>

      {/* Render children directly below parent (no indentation) */}
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {node.children?.map((child) => (
            <SidebarMenuItem
              key={child.id}
              node={child}
              depth={child.depth}
              onToggleExpand={onToggleExpand}
              onNavigate={onNavigate}
              currentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const { tree } = useAppSelector((state) => state.menu);
  const router = useRouter();
  const pathname = usePathname();

  const handleToggleExpand = (id: string) => {
    dispatch(toggleMenuExpansion(id));
  };

  const handleNavigate = (node: Menu) => {
    const path =
      node.name === "Menus"
        ? "/menus"
        : `/menus/${node.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[&]/g, "and")}`;
    router.push(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen z-50 transition-transform duration-300",
          "w-full lg:w-1/5 min-w-[288px] p-[24px]",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="h-full w-full border-r border-sidebar-border bg-sidebar rounded-[24px] flex flex-col">
          <div className="flex items-center justify-between p-8 border-b border-sidebar-border">
            <CloitLogo />
            <IconButton onClick={onClose} className="lg:hidden">
              <X className="w-5 h-7" />
            </IconButton>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 gap-4 space-y-3 overflow-y-auto">
            {tree[0]?.children?.map((item: Menu) => (
              <SidebarMenuItem
                key={item.id}
                node={item}
                depth={item.depth}
                onToggleExpand={handleToggleExpand}
                onNavigate={handleNavigate}
                currentPath={pathname}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
