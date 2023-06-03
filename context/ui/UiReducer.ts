import { UiState } from "./UiProvider";

type UiActionType =
  | { type: "UI - Open sidebar" }
  | { type: "UI - Close sidebar" }
  | { type: "UI - Adding entry"; payload: boolean }
  | { type: "UI - Start dragging" }
  | { type: "UI - End dragging" };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "UI - Open sidebar":
      return {
        ...state,
        sideMenuOpen: true,
      };
    case "UI - Close sidebar":
      return {
        ...state,
        sideMenuOpen: false,
      };
    case "UI - Adding entry":
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case "UI - Start dragging":
      return {
        ...state,
        isDragging: true,
      };
    case "UI - End dragging":
      return {
        ...state,
        isDragging: false,
      };
    default:
      return state;
  }
};
