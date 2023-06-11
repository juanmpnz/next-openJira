// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/database";

import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return addEntry(req, res);
    default:
      return res.status(400).json({ message: "El endpoint no existe" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  return res.status(200).json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description = "" } = req.body;
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });
  

  try {
    await db.connect(); // conecto la db
    await newEntry.save(); // guardo en la base de datos
    res.status(201).json(newEntry); //envio 201 creado con el objeto de la entrada
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Aglo salio mal" });
  }
};



