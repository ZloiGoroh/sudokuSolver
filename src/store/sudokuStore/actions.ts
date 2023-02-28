import { ActionTree } from "vuex";
import { ISudokuState, TCellCoordinates } from "@/store/sudokuStore/types";
import { IUpdateCellPayload } from "@/store/sudokuStore/types";
import { SudokuCell } from "@/utils/SudokuCell";
import {
	cellRowHandler,
	getCellCoords,
	getCoords,
} from "@/store/sudokuStore/helpers";

const actions: ActionTree<ISudokuState, ISudokuState> = {
	updateGridSize({ commit }, newSize: number) {
		commit("setGridSize", newSize);
		commit("setCellsMap");
	},
	setCellValue({ commit }, payload: IUpdateCellPayload) {
		commit("updateMap", payload);
	},
	// Проходим по всем элементам таблицы и удаляем варианты
	// которые точно не могут там присутствовать
	countIteration({ state, getters, commit }) {
		commit("setBlockedItems", true);
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
	// Проходим по всем подгруппам (колонкам, рядам, подтаблицам)
	// И устанавливаем значения в ячейках, которые могут быть тольок в них
	async subGroupIteration({ dispatch }) {
		await dispatch("countRowsUnique");
		await dispatch("countColumnsUnique");
		await dispatch("countSubGridsUnique");
	},
	async countColumnsUnique({ dispatch, state, getters, commit }) {
		// await dispatch("countIteration");
		let newMap: ISudokuState["cellsMap"] = new Map(state.cellsMap);
		getters.allColumns.forEach(
			(gridCol: SudokuCell[], colNumber: number) => {
				cellRowHandler(newMap, getters.maximumCount, gridCol, {
					rowCoordinate: colNumber,
				});
			}
		);
		commit("remakeMap", newMap);
		// await dispatch("countIteration");
	},
	async countRowsUnique({ dispatch, state, getters, commit }) {
		// await dispatch("countIteration");
		let newMap: ISudokuState["cellsMap"] = new Map(state.cellsMap);
		getters.allRows.forEach((gridRow: SudokuCell[], rowNumber: number) => {
			cellRowHandler(newMap, getters.maximumCount, gridRow, {
				columnCoordinate: rowNumber,
			});
		});
		commit("remakeMap", newMap);
		// await dispatch("countIteration");
	},
	async countSubGridsUnique({ dispatch, state, getters, commit }) {
		// await dispatch("countIteration");
		let newMap: ISudokuState["cellsMap"] = new Map(state.cellsMap);
		getters.allSubGrids.forEach(
			(subCol: SudokuCell[][][], subColCount: number) => {
				subCol.forEach((subCell, subRowCount) => {
					cellRowHandler(
						newMap,
						getters.maximumCount,
						subCell.flat(),
						{},
						(iterator) =>
							getCellCoords(
								subColCount * state.subgridSize +
									Math.floor(iterator / state.subgridSize),
								subRowCount * state.subgridSize +
									(iterator % state.subgridSize)
							)
					);
				});
			}
		);
		commit("remakeMap", newMap);
		// await dispatch("countIteration");
	},
	resetGrid({ commit }) {
		commit("setCellsMap");
		commit("setBlockedItems", false);
	},
};

export default actions;
