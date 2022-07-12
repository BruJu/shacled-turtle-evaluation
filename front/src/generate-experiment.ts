import axios from "axios";
import { ExperimentConfiguration } from "./ExperimentConfiguration";

const schemas = [
  "data/foaf-naive.ttl",
  "data/foaf-shacledturtle.ttl"
];

const texts = [
  "data/text_foaf03.txt",
  "data/text_foaf04.txt",
];


class RandomPicker {
  schemas: string[] = [...schemas];
  texts: string[] = [...texts];

  static async loadUrl(content: string): Promise<string> {
    const data = (await axios.get<string>(content)).data;
    return data;
  }

  async draw(): Promise<ExperimentConfiguration | null> {
    if (this.schemas.length === 0) return null;

    if (texts.length === 0) {
      this.texts = [...texts];
    }

    let schemaName = drawRandom(this.schemas);
    let textName = drawRandom(this.texts);

    const schema = await RandomPicker.loadUrl(schemaName);
    const text = await RandomPicker.loadUrl(textName);

    return {
      schemaname: schemaName,
      corpusname: textName,
      corpus: text,
      schema: schema
    };
  }
}

function drawRandom<T>(array: T[]): T {
  const i = Math.floor(Math.random() * array.length);
  const [element] = array.splice(i, 1);
  return element;
}

export default async function generateExperiment(): Promise<ExperimentConfiguration[]> {
  const drawer = new RandomPicker();

  let values: ExperimentConfiguration[] = [];

  while (true) {
    const x = await drawer.draw();
    if (x === null) break;
    values.push(x);
  }
  
  return values;
}
