// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/database";
import { seedData } from "@/database/seed-data";

import { Entry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(process.env.NODE_ENV === "production"){
        return res.status(401).json({ message: "No tiene acceso a este servicio" });
    }

    await db.connect()
    // borro todo lo de la db de entries
    await Entry.deleteMany()
    await Entry.insertMany(seedData.entries)
    await db.disconnect()

  res.status(201).json({ message: "Exito en el proceso" });
}
