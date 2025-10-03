'use client';

import { useState } from 'react';
import TreeItem from '../molecules/TreeItem';
import { Button } from '../atoms/Button';
import { TreeNode } from '@/store/menuSlice';

interface TreeViewProps {
  onAdd?: (node: TreeNode) => void;
}

const TreeView = ({ onAdd }: TreeViewProps) => {
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

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const handleToggle = (id: string) => {
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

  const handleSelect = (node: TreeNode) => {
    setSelectedNode(node);
  };

  const handleExpandAll = () => {
    const getAllMenuIds = (menus: TreeNode[]): string[] => {
      let ids: string[] = [];
      menus.forEach((menu) => {
        ids.push(menu.id);
        if (menu.children && menu.children.length > 0) {
          ids = ids.concat(getAllMenuIds(menu.children));
        }
      });
      return ids;
    };
    setExpandedNodes(new Set(getAllMenuIds(treeData)));
  };

  const handleCollapseAll = () => {
    setExpandedNodes(new Set());
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={handleExpandAll}
          className="bg-foreground text-background hover:bg-foreground/90"
        >
          Expand All
        </Button>
        <Button
          onClick={handleCollapseAll}
          variant="outline"
          className="border-border hover:bg-muted"
        >
          Collapse All
        </Button>
      </div>

      <div className="border border-border rounded-lg bg-card p-2">
        {treeData.map((node) => (
          <TreeItem
            key={node.id}
            node={{ ...node, expanded: expandedNodes.has(node.id) }}
            onToggle={handleToggle}
            onSelect={handleSelect}
            onAdd={onAdd}
            selectedId={selectedNode?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeView;
