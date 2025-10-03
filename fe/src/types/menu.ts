export interface Menu {
  id: string;
  name: string;
  nameKr: string;
  depth: number;
  isActive: boolean;
  parentId: string | null;
  parent?: Menu | null;
  children?: Menu[];
  createdAt: string;
  updatedAt: string;
  expanded?: boolean;
}

export interface CreateMenuDto {
  name: string;
  nameKr?: string;
  depth: number;
  isActive?: boolean;
  parentId?: string;
}

export interface UpdateMenuDto {
  name?: string;
  nameKr?: string;
  depth?: number;
  isActive?: boolean;
  parentId?: string;
}

export interface MenuState {
  menus: Menu[];
  tree: Menu[];
  selectedMenu: string | null;
  selectedNode: Menu | null;
  loading: boolean;
  error: string | null;
  expandedMenuIds: Set<string>;
}