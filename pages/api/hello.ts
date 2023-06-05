// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  ok: boolean;
  method: string;
  secret: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
 return res.status(201).json({secret: process.env.SECRET_KEY || "No esta", message: "John Doe", ok: true, method: req.method || "No hay method" });
}
