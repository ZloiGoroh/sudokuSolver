import { ISudokuState } from "@/store/sudokuStore/types";

let startSubgridSize = 2;

export const state: ISudokuState = {
	cellsMap: new Map(),
	subgridSize: startSubgridSize,
};
