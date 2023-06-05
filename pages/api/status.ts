import type { NextApiRequest, NextApiResponse } from "next";
import { EntryStatus } from "@/interfaces";

type Data = {
  data: EntryStatus[]
 
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];


  res.status(400).json({ data: validStatus });
}
