export interface Menu {
  id: string;
  name: string;
  nameKr?: string;
  depth: number;
  isActive: boolean;
  parentId?: string;
  parent?: Menu;
  children?: Menu[];
  createdAt?: string;
  updatedAt?: string;
  expanded?: boolean;
  menuExpanded?: boolean;
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
  tree: Menu[];
  selectedMenu?: string;
  selectedNode?: Menu;
  expandAllActive: boolean;
  collapseAllActive: boolean;
  loading: boolean;
  error?: string;
}
