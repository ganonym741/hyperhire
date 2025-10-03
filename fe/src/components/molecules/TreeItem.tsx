import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Menu } from "@/types/menu";

interface TreeItemProps {
  node: Menu;
  onToggle: (id: string) => void;
  onSelect: (node: Menu) => void;
  onAdd?: (node: Menu) => void;
  selectedId?: string;
}

const TreeItem = ({
  node,
  onToggle,
  onSelect,
  onAdd,
  selectedId,
}: TreeItemProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const indentLevel = node.depth * 30;

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-start space-x-2 gap-1 py-1.5 px-2 hover:bg-muted/50 rounded group",
          selectedId === node.id && "bg-muted",
        )}
        style={{ paddingLeft: `${indentLevel + 8}px` }}
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
        <span
          className="text-sm text-foreground mr-4 cursor-pointer "
          onClick={() => onSelect(node)}
        >
          {node.name}
        </span>
        {onAdd && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(node);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 group-hover:bg-primary rounded-full transition-opacity cursor-pointer "
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
