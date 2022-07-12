import Datastore from "nedb";
import { Answer } from "./answer-schema";

export type StoredInfo = { date: number; sent: Answer; };

export default class FileDataStorage {
  readonly db: Datastore<StoredInfo>;

  constructor(filename: string) {
    this.db = new Datastore({ filename: filename, autoload: true });
  }

  addData(data: Answer): boolean {
    const trueData = { date: Date.now(), sent: data };

    this.db.insert(trueData, err => {
      if (err !== null) {
        console.error("Error on insertion", err);
      }
    });
    
    return true;
  }
}
