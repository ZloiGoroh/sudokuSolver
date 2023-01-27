import { ActionTree } from "vuex";
import { ISudokuState, TCellCoordinates } from "@/store/sudokuStore/types";
import { IUpdateCellPayload } from "@/store/sudokuStore/types";
import { SudokuCell } from "@/utils/SudokuCell";
import { getCoords } from "@/store/sudokuStore/helpers";

const actions: ActionTree<ISudokuState, ISudokuState> = {
	updateGridSize({ commit }, newSize: number) {
		commit("setGridSize", newSize);
		commit("setCellsMap");
	},
	setCellValue({ commit }, payload: IUpdateCellPayload) {
		commit("updateMap", payload);
	},
	countIteration({ state, getters, commit }) {
		let newMap: ISudokuState["cellsMap"] = new Map();
		state.cellsMap.forEach((value: SudokuCell, key: TCellCoordinates) => {
			if (value.currentValue) {
				return newMap.set(key, value);
			}
			let coords = getCoords(key);
			let updatedCell: SudokuCell = value;
			let cellGroup = getters.getGroupByCoords(coords.x, coords.y);
			cellGroup.forEach((cell: SudokuCell) => {
				if (
					cell.currentValue &&
					typeof cell.currentValue === "number"
				) {
					updatedCell = value.removeImpossibleValue(
						cell.currentValue
					);
				}
			});
			newMap.set(key, updatedCell);
		});
		commit("remakeMap", newMap);
	},
};

export default actions;
