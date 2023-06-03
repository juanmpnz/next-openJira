import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (value: boolean) => void;
  isAddingEntry: boolean;
  endDragging: () => void;
  startDragging: () => void;
  isDragging: boolean;
}

export const UiContext = createContext({} as ContextProps);
