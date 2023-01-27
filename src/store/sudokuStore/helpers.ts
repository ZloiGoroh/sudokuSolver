import { TCellCoordinates } from "@/store/sudokuStore/types";

export function getCellCoords(x: number, y: number): TCellCoordinates {
	return `X:${x}/Y:${y}`;
}

export function getCoords(str: TCellCoordinates): { x: number; y: number } {
	let coords = /X:(\d+)\/Y:(\d)+/g.exec(str);
	return { x: Number(coords?.[1]), y: Number(coords?.[2]) };
}
