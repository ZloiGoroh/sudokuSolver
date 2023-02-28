import { ISudokuState, TCellCoordinates } from "@/store/sudokuStore/types";
import { SudokuCell } from "@/utils/SudokuCell";

export function getCellCoords(x: number, y: number): TCellCoordinates {
	return `X:${x}/Y:${y}`;
}

export function getCoords(str: TCellCoordinates): { x: number; y: number } {
	let coords = /X:(\d+)\/Y:(\d)+/g.exec(str);
	return { x: Number(coords?.[1]), y: Number(coords?.[2]) };
}

export const cellRowHandler = (
	resultMap: ISudokuState["cellsMap"],
	length: number,
	gridGroup: SudokuCell[],
	coords: { rowCoordinate?: number; columnCoordinate?: number },
	cordGetter?: (iterator: number) => TCellCoordinates
) => {
	let groupValues: Map<
		number,
		{ coords: TCellCoordinates; value: SudokuCell }[]
	> = new Map(Array.from({ length }, (_, i) => [i + 1, []]));
	gridGroup.forEach((gridCell, cellNumber) => {
		gridCell.possibleValues.forEach((val) => {
			let currentSet = groupValues.get(val);
			if (currentSet) {
				groupValues.set(val, [
					...currentSet,
					{
						coords: cordGetter
							? cordGetter(cellNumber)
							: getCellCoords(
									coords.rowCoordinate ?? cellNumber,
									coords.columnCoordinate ?? cellNumber
							  ),
						value: gridCell,
					},
				]);
			}
		});
	});
	if (cordGetter) {
		console.log(groupValues);
	}
	[...groupValues.entries()].forEach(([val, valueSet]) => {
		if (valueSet.length === 1) {
			resultMap.set(
				valueSet[0].coords,
				valueSet[0].value.setCurrentValue(val)
			);
		}
	});
};
