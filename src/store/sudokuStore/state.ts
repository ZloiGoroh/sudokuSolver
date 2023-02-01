import { ISudokuState } from "@/store/sudokuStore/types";

let startSubgridSize = 3;

export const state: ISudokuState = {
	cellsMap: new Map(),
	subgridSize: startSubgridSize,
	blocked: false,
	hoveredItem: "",
	focusedItem: "",
};
