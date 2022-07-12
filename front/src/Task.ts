import { EditorView, keymap } from "@codemirror/view";
import { changeSchema } from "shacled-turtle"
import { ExperimentConfiguration } from "./ExperimentConfiguration";
import * as n3 from "n3";
import { EditorState, StateEffect } from "@codemirror/state";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { turtle } from "@bruju/lang-turtle";
import shacledTurtleField from "shacled-turtle/dist/src/StateField";
import autocompletionSolve from "shacled-turtle/dist/src/autocompletion-solving";
import { CompletionStalk } from "./Typing";
import { basicSetup } from "@codemirror/basic-setup";
import lint from "shacled-turtle/dist/src/error-detection";

export type TaskState =
  TaskState_NotYetStarted | TaskState_Started | TaskState_Closed;


export type TaskState_NotYetStarted = { type: "not yet started" };

export type TaskState_Started = {
  type: "started";
  startedAt: number;
};

export type TaskState_Closed = {
  type: "closed";
  startedAt: number;
  closedAt: number;
};

export default class Task {
  corpus: string;
  schema: string;
  state: TaskState = { type: "not yet started" };
  taskText: string = "";
  codeBlock: EditorView;
  stats: CompletionStalk;

  constructor(
    experimentConfiguration: ExperimentConfiguration,
    block: HTMLElement,
    alwaysFilter: () => boolean
    ) {
    this.corpus = experimentConfiguration.corpusname;
    this.schema = experimentConfiguration.schemaname;
    this.stats = { show: 0, click: 0, explicitelyAsked: 0 };

    const ext = autocompletionSolve({
      usePrefixCC: false,
      displayErrors: true
    });

    const extensions = [
      basicSetup,
      turtle(),
      shacledTurtleField.extension,
      keymap.of([{key: "Tab", run: () => true}]),
      autocompletion({
        override: [
          (x: CompletionContext) => {
            const proxyed = ext(x);
            if (proxyed === null) return null;
            if (proxyed.options.length === 0) return null;

            if (!x.explicit && proxyed.filter === false) {
              if (alwaysFilter()) {
                proxyed.filter = true;
              }
            }

            if (x.explicit) {
              ++this.stats.explicitelyAsked;
            } else {
              ++this.stats.show;
            }

            const that = this;
            for (const completion of proxyed.options) {
              Reflect.defineProperty(completion, 'apply', {
                get: function() {
                  ++that.stats.click;
                  return completion.label;
                }
              });
            }

            return proxyed;
          }
        ]
      }),
      lint
    ];

    this.codeBlock = new EditorView({
      parent: block,
      state: EditorState.create({
        doc: getInitialDocument(),
        extensions: [extensions]
      })
    });

    const schemaQuads = new n3.Parser().parse(experimentConfiguration.schema);
    changeSchema(this.codeBlock.state, schemaQuads);
  }

  finalize(): TaskFinalData | null {
    if (this.state.type === "not yet started") return null;

    let time;
    if (this.state.type === "started") {
      time = Date.now() - this.state.startedAt;
    } else {
      time = this.state.closedAt - this.state.startedAt;
    }

    return {
      schema: this.schema,
      corpus: this.corpus,
      time: time,
      writtenDocument: this.codeBlock.state.sliceDoc(),
      stats: {...this.stats}
    };
  }

  onButtonClick(): 'startChrono' | 'endChrono' | null {
    if (this.state.type === "not yet started") {
      this.state = {
        type: 'started',
        startedAt: Date.now()
      };

      return 'startChrono';
    } else if (this.state.type === 'started') {
      this.state = {
        type: 'closed',
        startedAt: this.state.startedAt,
        closedAt: Date.now()
      };

      this.codeBlock.dispatch({
        effects: StateEffect.appendConfig.of(EditorState.readOnly.of(true))
      });

      return 'endChrono';
    } else {
      return null;
    }
  }
}


export type TaskFinalData = {
  corpus: string;
  schema: string;
  time: number;
  writtenDocument: string;
  stats: CompletionStalk;
}


function getInitialDocument(): string {
  const baseStr = "@base <http://example.org/> .";
  
  const prefixesStr = Object.entries(prefixes)
  .map(([short, long]) => `@prefix ${short}: <${long}> .`)
  .join("\n");
  
  return baseStr + "\n" + prefixesStr + "\n\n";
}


const prefixes: {[short: string]: string} = {
  "": "http://example.org/",
  "ex": "http://example.org/",
  "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  "xsd": "http://www.w3.org/2001/XMLSchema#",
  "foaf": "http://xmlns.com/foaf/0.1/",
  "owl": "http://www.w3.org/2002/07/owl#"
  // "s": "http://schema.org/"
}

