import { db } from "@/database";
import { Entry as IEntry } from "@/interfaces";
import { Entry } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IEntry;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "Methodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "La entrada no existe" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    return res.status(200).json(updatedEntry!);
  } catch (error) {
    await db.disconnect();
    const err: any = JSON.stringify(error);
    return res.status(400).json({ message: err.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryId = await Entry.findById(id);
  await db.disconnect();
  if (!entryId) {
    res.status(400).json({ message: "La entrada no existe" });
  }
  res.status(200).json(entryId);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    await db.connect(); // conecto la db
    await Entry.findByIdAndDelete(id);
    await db.disconnect();
    res.status(201).json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Aglo salio mal" });
  }
};
