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
	// Массив из строк
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
	// Массив из колонн
	allColumns(state, getters) {
		let columns: SudokuCell[][] = [];
		getters.maxCountIterate((i: number) => {
			let cells: SudokuCell[] = [];
			getters.maxCountIterate((j: number) => {
				cells.push(getters.getCellByCoords(i, j));
			});
			columns.push(cells);
		});

		return columns;
	},
	allSubGrids(state, getters) {
		let subGrids: SudokuCell[][][][] = [];
		// Колонка ряд подблоков
		getters.maxCountIterate((subGridCounter: number) => {
			let subGridCol = subGridCounter % state.subgridSize;
			let subGridRow = Math.floor(subGridCounter / state.subgridSize);
			if (!subGrids[subGridCol]) {
				subGrids[subGridCol] = [];
			}
			subGrids[subGridCol][subGridRow] = [];
			// колонка ряд элементов подблока
			getters.maxCountIterate((cellCounter: number) => {
				let cellCol = cellCounter % state.subgridSize;
				let cellRow = Math.floor(cellCounter / state.subgridSize);
				if (!subGrids[subGridCol][subGridRow][cellCol]) {
					subGrids[subGridCol][subGridRow][cellCol] = [];
				}
				subGrids[subGridCol][subGridRow][cellCol][cellRow] =
					getters.getCellByCoords(
						state.subgridSize * subGridCol + cellCol,
						state.subgridSize * subGridRow + cellRow
					);
			});
		});
		return subGrids;
	},
};

export default getters;
