import { FC, useReducer } from "react";
import { entriesReducer, EntriesContext } from "./";
import { Entry } from "@/interfaces";

import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEnrty: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };
    dispatch({ type: "[entry] - Add-entry", payload: newEnrty });
  };

  const onEntryUpdated = (entry: Entry) => {
    dispatch({ type: "[entry] - Entry-updated", payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        onEntryUpdated,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
