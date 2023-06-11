import { FC, useReducer } from "react";
import { UiContext, uiReducer } from "./";
import React from "react";
import { EntryStatus } from "@/interfaces";
import { entriesApi } from "@/apis";

export interface UiState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  statusValid: [];
}

const UI_INITIAL_STATE: UiState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  statusValid: [],
};

export const UiProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open sidebar" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close sidebar" });
  };

  const setIsAddingEntry = (value: boolean) => {
    dispatch({ type: "UI - Adding entry", payload: value });
  };

  const startDragging = () => {
    dispatch({ type: "UI - Start dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "UI - End dragging" });
  };
 
  return (
    <UiContext.Provider
      value={{
        ...state,
        closeSideMenu,
        openSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
