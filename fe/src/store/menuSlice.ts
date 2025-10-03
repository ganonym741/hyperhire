import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Menu, CreateMenuDto, UpdateMenuDto, MenuState } from '@/types/menu';
import { menuApi } from '@/service/api';

export type TreeNode = Menu;

const initialState: MenuState = {
  menus: [],
  tree: [],
  selectedMenu: null,
  selectedNode: null,
  loading: false,
  error: null,
  expandedMenuIds: new Set<string>(),
};

// Async thunks
export const fetchMenuTree = createAsyncThunk(
  'menu',
  async (_, { rejectWithValue }) => {
    try {
      const data = await menuApi.getTree();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch menu tree';
      return rejectWithValue(message);
    }
  }
);

export const fetchMenuById = createAsyncThunk(
  'menu/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await menuApi.getById(id);
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch menu';
      return rejectWithValue(message);
    }
  }
);

export const createMenu = createAsyncThunk(
  'menu/create',
  async (menuData: CreateMenuDto, { rejectWithValue }) => {
    try {
      const data = await menuApi.create(menuData);
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create menu';
      return rejectWithValue(message);
    }
  }
);

export const updateMenu = createAsyncThunk(
  'menu/update',
  async ({ id, data }: { id: string; data: UpdateMenuDto }, { rejectWithValue }) => {
    try {
      const result = await menuApi.update(id, data);
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update menu';
      return rejectWithValue(message);
    }
  }
);

export const deleteMenu = createAsyncThunk(
  'menu/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await menuApi.delete(id);
      return id;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete menu';
      return rejectWithValue(message);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedMenu: (state, action: PayloadAction<string | null>) => {
      state.selectedMenu = action.payload;
    },
    setSelectedNode: (state, action: PayloadAction<Menu | null>) => {
      state.selectedNode = action.payload;
    },
    toggleMenuExpanded: (state, action: PayloadAction<string>) => {
      const menuId = action.payload;
      const newSet = new Set(state.expandedMenuIds);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      state.expandedMenuIds = newSet;
    },
    expandAll: (state) => {
      const getAllMenuIds = (menus: Menu[]): string[] => {
        let ids: string[] = [];
        menus.forEach((menu) => {
          ids.push(menu.id);
          if (menu.children && menu.children.length > 0) {
            ids = ids.concat(getAllMenuIds(menu.children));
          }
        });
        return ids;
      };
      state.expandedMenuIds = new Set(getAllMenuIds(state.tree));
    },
    collapseAll: (state) => {
      state.expandedMenuIds = new Set<string>();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch menu tree
    builder
      .addCase(fetchMenuTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuTree.fulfilled, (state, action) => {
        state.loading = false;
        state.tree = action.payload;
      })
      .addCase(fetchMenuTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch menu by ID
    builder
      .addCase(fetchMenuById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNode = action.payload;
      })
      .addCase(fetchMenuById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create menu
    builder
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus.push(action.payload);
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update menu
    builder
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.menus.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.menus[index] = action.payload;
        }
        if (state.selectedNode?.id === action.payload.id) {
          state.selectedNode = action.payload;
        }
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete menu
    builder
      .addCase(deleteMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = state.menus.filter((m) => m.id !== action.payload);
        if (state.selectedNode?.id === action.payload) {
          state.selectedNode = null;
        }
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedMenu,
  setSelectedNode,
  toggleMenuExpanded,
  expandAll,
  collapseAll,
  clearError,
} = menuSlice.actions;

export default menuSlice.reducer;