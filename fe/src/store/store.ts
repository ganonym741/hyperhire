import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredPaths: ["menu.expandedMenuIds"],
        // Ignore these action types
        ignoredActions: [
          "menu/toggleMenuExpanded",
          "menu/expandAll",
          "menu/collapseAll",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
