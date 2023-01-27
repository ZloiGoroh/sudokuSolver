import { ActionTree } from "vuex";
import { ISudokuState } from "@/store/sudokuStore/types";
import { IUpdateCellPayload } from "@/store/sudokuStore/types";

const actions: ActionTree<ISudokuState, ISudokuState> = {
	updateGridSize({ commit }, newSize: number) {
		commit("setGridSize", newSize);
		commit("setCellsMap");
	},
	setCellValue({ commit }, payload: IUpdateCellPayload) {
		commit("updateMap", payload);
	},
};

export default actions;
