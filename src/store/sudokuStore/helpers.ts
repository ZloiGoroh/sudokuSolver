import { TCellCoordinates } from "@/store/sudokuStore/types";

export function getCellCoords(x: number, y: number): TCellCoordinates {
	return `X:${x}/Y:${y}`;
}
