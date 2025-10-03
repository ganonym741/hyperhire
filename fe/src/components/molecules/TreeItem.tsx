import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { TreeNode } from '@/store/menuSlice';
import { cn } from '@/lib/utils';

interface TreeItemProps {
  node: TreeNode;
  onToggle: (id: string) => void;
  onSelect: (node: TreeNode) => void;
  onAdd?: (node: TreeNode) => void;
  selectedId?: string;
}

const TreeItem = ({ node, onToggle, onSelect, onAdd, selectedId }: TreeItemProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const indentLevel = node.depth * 20;

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-1 py-1.5 px-2 hover:bg-muted/50 cursor-pointer rounded group',
          selectedId === node.id && 'bg-muted'
        )}
        style={{ paddingLeft: `${indentLevel + 8}px` }}
        onClick={() => onSelect(node)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className="p-0.5 hover:bg-muted rounded"
          >
            {node.expanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}
        <span className="text-sm text-foreground flex-1">{node.name}</span>
        {onAdd && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(node);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-primary rounded transition-opacity"
          >
            <Plus className="w-4 h-4 text-primary-foreground" />
          </button>
        )}
      </div>
      {hasChildren && node.expanded && (
        <div>
          {node.children?.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              onToggle={onToggle}
              onSelect={onSelect}
              onAdd={onAdd}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeItem;
