import { MutationTree } from "vuex";
import { ISudokuState, TCellCoordinates } from "@/store/sudokuStore/types";
import { IUpdateCellPayload } from "@/store/sudokuStore/types";
import { getCellCoords } from "@/store/sudokuStore/helpers";
import { SudokuCell } from "@/utils/SudokuCell";

const mutations: MutationTree<ISudokuState> = {
	setGridSize(state, newSize: number) {
		state.subgridSize = newSize;
	},
	setCellsMap(state) {
		const currentSize = Math.pow(state.subgridSize, 2);
		let newMap: ISudokuState["cellsMap"] = new Map();
		for (let i = 0; i < currentSize; ++i) {
			for (let j = 0; j < currentSize; ++j) {
				newMap.set(getCellCoords(j, i), new SudokuCell(currentSize));
			}
		}
		state.cellsMap = newMap;
	},
	updateMap(state, payload: IUpdateCellPayload) {
		let newMap = new Map([...state.cellsMap.entries()]);
		if ("coords" in payload) {
			newMap.set(payload.coords, payload.newValue);
		} else {
			newMap.set(getCellCoords(payload.x, payload.y), payload.newValue);
		}
		state.cellsMap = newMap;
	},
	remakeMap(state, newMap: ISudokuState["cellsMap"]) {
		state.cellsMap = newMap;
	},
	setBlockedItems(state, isBlocked: boolean) {
		state.blocked = isBlocked;
	},
	setHoveredCoords(
		state,
		payload: { x: number; y: number } | TCellCoordinates | ""
	) {
		if (typeof payload === "object") {
			state.hoveredItem = getCellCoords(payload.x, payload.y);
		} else {
			state.hoveredItem = payload;
		}
	},
	setFocusedCoords(
		state,
		payload: { x: number; y: number } | TCellCoordinates | ""
	) {
		if (typeof payload === "object") {
			state.focusedItem = getCellCoords(payload.x, payload.y);
		} else {
			state.focusedItem = payload;
		}
	},
};

export default mutations;
