import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleNodeExpansion,
  expandAll,
  collapseAll,
  setSelectedNode,
} from "@/store/menuSlice";
import TreeItem from "../molecules/TreeItem";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";
import { Menu } from "@/types/menu";
import { Dispatch, SetStateAction } from "react";

interface TreeViewProps {
  onAdd?: (node: Menu) => void;
  setAction: Dispatch<SetStateAction<"delete" | "create" | "update" | "none">>;
}

const TreeView = ({ onAdd, setAction }: TreeViewProps) => {
  const dispatch = useAppDispatch();
  const { tree, selectedNode, expandAllActive, collapseAllActive } =
    useAppSelector((state) => state.menu);

  const handleToggle = (id: string) => {
    dispatch(toggleNodeExpansion(id));
  };

  const handleSelect = (node: Menu) => {
    setAction("update");
    dispatch(setSelectedNode(node));
    dispatch(toggleNodeExpansion(node.id));
  };

  const handleExpandAll = () => {
    dispatch(expandAll());
  };

  const handleCollapseAll = () => {
    dispatch(collapseAll());
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={handleExpandAll}
          variant="outline"
          className={cn(
            "border-border rounded-full py-3 px-8",
            expandAllActive
              ? "bg-foreground text-background hover:text-background hover:bg-foreground/90"
              : "hover:bg-muted/60",
          )}
        >
          Expand All
        </Button>
        <Button
          onClick={handleCollapseAll}
          variant="outline"
          className={cn(
            "border-border rounded-full py-3 px-8",
            collapseAllActive
              ? "bg-foreground text-background hover:text-background hover:bg-foreground/90"
              : "hover:bg-muted/60",
          )}
        >
          Collapse All
        </Button>
      </div>

      <div className="border border-border w-full lg:max-w-[552px] rounded-lg bg-card p-2">
        {tree.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
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
