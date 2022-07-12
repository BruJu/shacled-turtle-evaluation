import buildServer from "./src/build-server";
import express from "express";
import { check } from "./src/answer-schema";
import FileDataStorage from "./src/FileDataStorage";

const app = buildServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable('x-powered-by');

app.use('/', express.static('parcel'));

function getDateStr(date: Date) {
  function s(x: number, padding: number = 2) {
    return x.toString().padStart(padding, "0");
  }

  return s(date.getUTCFullYear(), 4)
    + s(date.getUTCMonth()) 
    + s(date.getUTCDate())  
}

const filename = "results-from-session-" + getDateStr(new Date()) + ".db";

const storage = new FileDataStorage(filename);

app.post("/api/post-results", async (req, res) => {
  try {
    const data = req.body;
    if (!check(data)) {
      console.log("[Rejected a post]");
      return res.json({ error: "bad format" });
    }
  
    storage.addData(data);
    console.log("[New result] ", data);
  
    return res.json({ ok: "ok" });
  } catch (err) {
    console.error(err);
    return res.json({ error: "Server internal error" });
  }
});
