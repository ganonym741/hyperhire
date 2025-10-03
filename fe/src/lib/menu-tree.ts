import { Menu } from "@/types/menu";

export function recurseToEditExpanding(menuId: string, menus: Menu[]) {
  let found = false;

  return menus.map((menu): Menu => {
    if (found) return menu;

    if (menu.id === menuId) {
      found = true;
      return { ...menu, expanded: !menu.expanded };
    }

    return {
      ...menu,
      children: menu.children
        ? recurseToEditExpanding(menuId, menu.children)
        : menu.children,
    };
  });
}

export function recurseToEditMenuExpanding(menuId: string, menus: Menu[]) {
  let found = false;

  return menus.map((menu): Menu => {
    if (found) return menu;

    if (menu.id === menuId) {
      found = true;
      return { ...menu, menuExpanded: !menu.menuExpanded };
    }

    return {
      ...menu,
      children: menu.children
        ? recurseToEditMenuExpanding(menuId, menu.children)
        : menu.children,
    };
  });
}

export function recursiveExpandingNodes(nodes: Menu[]) {
  return nodes.map(
    (node): Menu => ({
      ...node,
      expanded: true,
      children: node.children
        ? recursiveExpandingNodes(node.children)
        : node.children,
    }),
  );
}

export function recursiveCollapsingNodes(nodes: Menu[]) {
  return nodes.map((node): Menu => {
    return {
      ...node,
      expanded: false,
      children: node.children
        ? recursiveCollapsingNodes(node.children)
        : node.children,
    };
  });
}
