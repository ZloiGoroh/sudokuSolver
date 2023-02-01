import { SudokuCell } from "@/utils/SudokuCell";

export type IUpdateCellPayload = { newValue: SudokuCell } & (
	| { coords: TCellCoordinates }
	| { x: number; y: number }
);

export type TCellCoordinates = `X:${number}/Y:${number}`;

export interface ISudokuState {
	cellsMap: Map<TCellCoordinates, SudokuCell>;
	subgridSize: number;
	blocked: boolean;
	hoveredItem: TCellCoordinates | "";
	focusedItem: TCellCoordinates | "";
}
