import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Menu, CreateMenuDto, UpdateMenuDto, MenuState } from "@/types/menu";
import { menuApi } from "@/service/api";
import {
  recurseToEditExpanding,
  recurseToEditMenuExpanding,
  recursiveCollapsingNodes,
  recursiveExpandingNodes,
} from "@/lib/menu-tree";

const initialState: MenuState = {
  tree: [],
  selectedMenu: undefined,
  selectedNode: undefined,
  expandAllActive: true,
  collapseAllActive: false,
  loading: false,
  error: undefined,
};

// Async thunks
export const fetchMenuTree = createAsyncThunk(
  "menu",
  async (_, { rejectWithValue }) => {
    try {
      const data = await menuApi.getTree();
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch menu tree";
      return rejectWithValue(message);
    }
  },
);

export const fetchMenuById = createAsyncThunk(
  "menu/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await menuApi.getById(id);
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch menu";
      return rejectWithValue(message);
    }
  },
);

export const createMenu = createAsyncThunk(
  "menu/create",
  async (menuData: CreateMenuDto, { rejectWithValue }) => {
    try {
      const data = await menuApi.create(menuData);
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create menu";
      return rejectWithValue(message);
    }
  },
);

export const updateMenu = createAsyncThunk(
  "menu/update",
  async (
    { id, data }: { id: string; data: UpdateMenuDto },
    { rejectWithValue },
  ) => {
    try {
      const result = await menuApi.update(id, data);
      return result;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update menu";
      return rejectWithValue(message);
    }
  },
);

export const deleteMenu = createAsyncThunk(
  "menu/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await menuApi.delete(id);
      return id;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete menu";
      return rejectWithValue(message);
    }
  },
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedMenu: (state, action: PayloadAction<string | undefined>) => {
      state.selectedMenu = action.payload;
    },
    setSelectedNode: (state, action: PayloadAction<Menu | undefined>) => {
      state.selectedNode = action.payload;
    },
    toggleMenuExpansion: (state, action: PayloadAction<string>) => {
      const menuId = action.payload;

      state.tree = recurseToEditMenuExpanding(menuId, state.tree);
    },
    toggleNodeExpansion: (state, action: PayloadAction<string>) => {
      const menuId = action.payload;

      state.expandAllActive = false;
      state.collapseAllActive = false;
      state.tree = recurseToEditExpanding(menuId, state.tree);
    },
    expandAll: (state) => {
      state.expandAllActive = true;
      state.collapseAllActive = false;

      state.tree = recursiveExpandingNodes(state.tree);
    },
    collapseAll: (state) => {
      state.collapseAllActive = true;
      state.expandAllActive = false;

      state.tree = recursiveCollapsingNodes(state.tree);
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // Fetch menu tree
    builder
      .addCase(fetchMenuTree.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchMenuTree.fulfilled, (state, action) => {
        state.loading = false;
        state.expandAllActive = true;
        state.tree = recursiveExpandingNodes(action.payload);
      })
      .addCase(fetchMenuTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch menu by ID
    builder
      .addCase(fetchMenuById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
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
        state.error = undefined;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update menu
    builder
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tree.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.tree[index] = action.payload;
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
        state.error = undefined;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.tree = state.tree.filter((m) => m.id !== action.payload);
        if (state.selectedNode?.id === action.payload) {
          state.selectedNode = undefined;
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
  toggleMenuExpansion,
  toggleNodeExpansion,
  expandAll,
  collapseAll,
  clearError,
} = menuSlice.actions;

export default menuSlice.reducer;
