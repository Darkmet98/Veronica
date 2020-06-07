import {Entry} from "./Entry";
import {TextVisualizator} from "./TextVisualizator";

export interface PoEntry {
  CurrentEntry: Entry;
  PreviousEntry: Entry;
  NextEntry: Entry;
  Project: string;
  File: string;
  Size: number;
  Index: number;
  Visualizator: TextVisualizator;
}
