import { Entry } from "@/interfaces";
import { EntriesState } from "./EntriesProviders";

type EntriesTypes =
  | { type: "[entry] - Add-entry",payload: Entry }
  | { type: "[entry] - Entry-updated",payload: Entry }
  | { type: "[entry] - Refresh-entries", payload: Entry[]};

export const entriesReducer = (
  state: EntriesState,
  action: EntriesTypes
): EntriesState => {
  switch (action.type) {
    case "[entry] - Add-entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
      case "[entry] - Refresh-entries":
        return {
          ...state,
          entries: [...action.payload],
        };
    case "[entry] - Entry-updated":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    default:
      return state;
  }
};
