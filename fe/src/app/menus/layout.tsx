"use client";

import Breadcrumb from "@/components/molecules/Breadcrumb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMenuTree } from "@/store/menuSlice";
import { LayoutGrid } from "lucide-react";
import { useEffect, type PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const { loading, tree } = useAppSelector((state) => state.menu);

  useEffect(() => {
    if (tree?.length === 0) {
      dispatch(fetchMenuTree());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb items={["Menus"]} />

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <LayoutGrid className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Menus</h1>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading menu tree...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
