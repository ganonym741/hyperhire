"use client";

import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
import React, { useRef, useState } from "react";
import { Menu } from "@/types/menu";

interface MenuFormProps {
  formRef?: React.RefObject<HTMLDivElement | null>;
  handleUpdate?: (data: Menu) => void;
  handleCreate?: (data: Menu) => void;
  data?: Menu;
}

const MenuForm = ({
  formRef,
  handleCreate,
  handleUpdate,
  data,
}: MenuFormProps) => {
  const formElementRef = useRef<HTMLFormElement>(null);
  const [nameValue, setNameValue] = useState<string>("");

  const isCreate = !!handleCreate;

  React.useEffect(() => {
    if (!isCreate && data?.name) {
      setNameValue(data.name);
    } else if (isCreate) {
      setNameValue("");
    }
  }, [data?.name, isCreate]);

  const handleSubmit = () => {
    if (!formElementRef.current) return;

    const formData = new FormData(formElementRef.current);
    const name = formData.get("name") as string;

    const submitData: Menu = {
      id: isCreate ? "" : data?.id || "",
      name: name || "",
      depth: isCreate ? (data?.depth ?? 0) + 1 : data?.depth || 0,
      isActive: data?.isActive ?? true,
      parentId: isCreate ? data?.id : data?.parentId,
      parent: isCreate ? data : data?.parent,
      children: data?.children,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      expanded: data?.expanded,
      menuExpanded: data?.menuExpanded,
    };

    if (isCreate && handleCreate) {
      handleCreate(submitData);
    } else if (handleUpdate) {
      handleUpdate(submitData);
    }
  };

  return (
    <form
      ref={formElementRef}
      className="bg-card border border-border w-full lg:max-w-[552px] rounded-lg p-6 space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="id" className="text-sm font-medium">
          Menu ID
        </Label>
        <Input
          id="id"
          name="id"
          disabled={true}
          defaultValue={isCreate ? "-" : data?.id}
          className="bg-muted border-border"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="depth" className="text-sm font-medium">
          Depth
        </Label>
        <Input
          id="depth"
          name="depth"
          disabled={!data || isCreate}
          defaultValue={isCreate ? (data?.depth ?? 0) + 1 : data?.depth}
          className="bg-muted border-border max-w-[252px]"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="parentData" className="text-sm font-medium">
          Parent Data
        </Label>
        <Input
          id="parentData"
          name="parentData"
          disabled={true}
          defaultValue={isCreate ? data?.name : data?.parent?.name}
          className="bg-muted border-border max-w-[252px]"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          disabled={!data}
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          className="bg-muted border-border max-w-[252px]"
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-full text-base font-medium"
      >
        {isCreate ? "Create" : "Save"}
      </Button>
    </form>
  );
};

export default MenuForm;
