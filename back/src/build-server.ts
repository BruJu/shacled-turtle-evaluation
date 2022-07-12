import express from "express";

export default function buildServer(): express.Express {
  const server = express();
  const PORT = 7071;

  // @ts-ignore
  if (typeof(PhusionPassenger) !== 'undefined') {
    server.listen('passenger', () => { console.log("Listening") });
  } else {
    server.listen(PORT, () => {
      console.log("Listening on http://localhost:" + PORT);
    })
  }

  return server;
}
