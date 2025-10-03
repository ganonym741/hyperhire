'use client';

import { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from '../atoms/Logo';
import IconButton from '../atoms/IconButton';
import { cn } from '@/lib/utils';
import { TreeNode } from '@/store/menuSlice';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const getIconForNode = (name: string, hasChildren: boolean | undefined) => {
  // Parent items with children get folder icon
  if (hasChildren) {
    return '📁';
  }

  // Child items get grid icon
  return '⊞';
};

const SidebarMenuItem = ({ 
  node, 
  depth = 0,
  expandedNodes,
  onToggleExpand,
  onNavigate,
  currentPath
}: { 
  node: TreeNode; 
  depth?: number;
  expandedNodes: Set<string>;
  onToggleExpand: (id: string) => void;
  onNavigate: (node: TreeNode) => void;
  currentPath: string;
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand(node.id);
    } else {
      onNavigate(node);
    }
  };

  const isParent = depth === 0;
  const isChild = depth === 1;
  
  // Generate URL path from node name
  const nodePath = node.name === 'Menus' 
    ? '/menus' 
    : `/${node.name.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')}`;
  const isActive = currentPath === nodePath;

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left',
          // Parent styling
          isParent && !isExpanded && 'text-sidebar-foreground/70 hover:bg-sidebar-hover/40',
          isParent && isExpanded && 'bg-sidebar-hover text-sidebar-foreground',
          // Child styling
          isChild && isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
          isChild && !isActive && 'text-sidebar-foreground/60 hover:bg-sidebar-hover/30'
        )}
      >
        <span className="text-base flex-shrink-0">{getIconForNode(node.name, hasChildren)}</span>
        <span className="text-sm flex-1">{node.name}</span>
        {hasChildren && isParent && (
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
      {hasChildren && isExpanded && isParent && (
        <div className="mt-1 space-y-1">
          {node.children?.map((child) => (
            <SidebarMenuItem 
              key={child.id} 
              node={child} 
              depth={depth + 1}
              expandedNodes={expandedNodes}
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
  // Sample tree data since Redux is not available
  const treeData: TreeNode[] = [
    {
      id: '1',
      name: 'Menus',
      nameKr: '메뉴',
      depth: 0,
      parentId: null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      children: [
        {
          id: '2',
          name: 'User Management',
          nameKr: '사용자 관리',
          depth: 1,
          parentId: '1',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          children: []
        },
        {
          id: '3',
          name: 'Role Management',
          nameKr: '역할 관리',
          depth: 1,
          parentId: '1',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          children: []
        }
      ]
    }
  ];
  const router = useRouter();
  const pathname = usePathname();
  
  // Local state for sidebar expansion (independent from tree view)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['systems', 'users-groups']));
  
  // Get "System Management" node and its children
  const systemManagementNode = treeData[0]?.children?.[0];
  const menuItems = systemManagementNode?.children || [];

  const handleToggleExpand = (id: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleNavigate = (node: TreeNode) => {
    const path = node.name === 'Menus'
      ? '/menu'
      : `/${node.name.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')}`;
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
          'fixed lg:sticky top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 flex flex-col',
          'w-[240px]',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Logo />
          <IconButton onClick={onClose} className="lg:hidden">
            <X className="w-5 h-5" />
          </IconButton>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item: TreeNode) => (
            <SidebarMenuItem 
              key={item.id} 
              node={item}
              expandedNodes={expandedNodes}
              onToggleExpand={handleToggleExpand}
              onNavigate={handleNavigate}
              currentPath={pathname}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
