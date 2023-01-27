import { GetterTree } from "vuex";
import { ISudokuState } from "@/store/sudokuStore/types";
import { SudokuCell } from "@/utils/SudokuCell";
import { getCellCoords } from "@/store/sudokuStore/helpers";

const getters: GetterTree<ISudokuState, ISudokuState> = {
	maximumCount(state) {
		return Math.pow(state.subgridSize, 2);
	},
	maxCountIterate(state, getters) {
		return (callback: (iter: number) => void) => {
			for (let i = 0; i < getters.maximumCount; ++i) {
				callback(i);
			}
		};
	},
	getCellByCoords(state) {
		return (x: number, y: number) =>
			state.cellsMap.get(getCellCoords(x, y));
	},
	allItems(state, getters) {
		let rows: SudokuCell[][] = [];
		getters.maxCountIterate((i: number) => {
			let cells: SudokuCell[] = [];
			getters.maxCountIterate((j: number) => {
				cells.push(getters.getCellByCoords(j, i));
			});
			rows.push(cells);
		});

		return rows;
	},
};

export default getters;
