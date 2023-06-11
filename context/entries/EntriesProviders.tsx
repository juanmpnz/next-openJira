import { FC, useReducer, useEffect } from "react";
import { entriesReducer, EntriesContext } from "./";
import { Entry } from "@/interfaces";

import { entriesApi } from "@/apis";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("entries", {
      description,
    });
    dispatch({ type: "[entry] - Add-entry", payload: data });
  };

  const onEntryUpdated = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`entries/${_id}`, {
        description,
        status,
      });
      console.log(data, "·")
      dispatch({ type: "[entry] - Entry-updated", payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  const onEntryDeleted = async ( _id: string | {}) => {
    try {
      await entriesApi.delete<Entry>(`entries/${_id}`);
      refreshEntries();
    } catch (err) {
      console.log(err);
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get("entries");
    dispatch({ type: "[entry] - Refresh-entries", payload: data });
  };

 useEffect(() => {
    refreshEntries();
  }, []); 

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        onEntryUpdated,
        onEntryDeleted
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
