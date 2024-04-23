const pdf = require("html-pdf");
import type { NextApiRequest, NextApiResponse } from "next";
import { transactionTemplate } from "templates/transaction";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileName, transaction } = JSON.parse(req.body);

  pdf
    .create(transactionTemplate(transaction))
    .toFile(`public/tickets/${fileName}.pdf`, (err: any, res: any) => {
      if (err) throw new Error("No se pudo crear el PDF");
    });

  res.status(200).end();
}
