export interface Entry {
  _id: {};
  description: string;
  createdAt: number;
  status: EntryStatus;
}

export type EntryStatus = "pending" | "in-progress" | "finished";
