"use client";

import { useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  createMenu,
  fetchMenuTree,
  setSelectedNode,
  updateMenu,
} from "@/store/menuSlice";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import TreeView from "@/components/organisms/TreeView";
import MenuForm from "@/components/organisms/MenuForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/molecules/Select";
import { Menu } from "@/types/menu";

import WhiteSubmenuIcon from "@assets/white-submenu.svg";

const MenusPage = () => {
  const { selectedNode, loading } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLDivElement>(null);
  const [action, setAction] = useState<"create" | "update" | "delete" | "none">(
    "none",
  );

  const handleCreateAction = (data: Menu) => {
    dispatch(
      createMenu({
        depth: data.depth,
        name: data.name ?? "",
        isActive: true,
        nameKr: "",
        parentId: data.parentId,
      }),
    ).then(() => dispatch(fetchMenuTree()));

    setAction("none");
  };

  const handleSaveAction = (data: Menu) => {
    dispatch(
      updateMenu({
        id: data.id,
        data: {
          name: data?.name,
          nameKr: "",
        },
      }),
    ).then(() => dispatch(fetchMenuTree()));

    setAction("none");
  };

  const handleAdd = (node: Menu) => {
    setAction("create");
    dispatch(setSelectedNode(node));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mx-3 md:mx-16 space-y-6">
      <Breadcrumb items={["Menus"]} />

      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
          <WhiteSubmenuIcon />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Menus</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Menu
          </label>
          <Select value={"system management"}>
            <SelectTrigger className="w-full h-[52px] rounded-[16px] px-4 py-[14px] max-w-md bg-muted border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-full h-fit rounded-[10px] px-4 py-3 max-w-md bg-background border-border">
              <SelectItem value="system management" className="bg-background">
                system management
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <TreeView onAdd={handleAdd} setAction={setAction} />
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <MenuForm
              formRef={formRef}
              handleCreate={
                action === "create" ? handleCreateAction : undefined
              }
              handleUpdate={action === "update" ? handleSaveAction : undefined}
              data={selectedNode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenusPage;
