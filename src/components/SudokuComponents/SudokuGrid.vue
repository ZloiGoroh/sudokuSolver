<template>
	<div
		class="SudokuGrid common-grid"
		@mouseleave="setHoveredCoords('')">
		<template v-for="(subCol, subColIndex) in allSubGrids">
			<div
				class="subgrid common-grid"
				v-for="(subCell, subCellIndex) in subCol"
				:key="`sub:${subColIndex}/${subCellIndex}`">
				<template v-for="(col, colIndex) in subCell">
					<div
						class="Sudoku-cell"
						v-for="(cell, cellIndex) in col"
						:key="`el${colIndex}/${subCellIndex}/${subColIndex}/${cellIndex}`">
						<sudoku-cell
							:key="`el${colIndex}/${subCellIndex}/${subColIndex}/${cellIndex}`"
							:y-coordinate="
								subCellIndex * subgridSize + cellIndex
							"
							:x-coordinate="subColIndex * subgridSize + colIndex"
							:disabled="blocked" />
					</div>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
import SudokuCell from "./SudokuCell.vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
	name: "SudokuGrid",
	components: { SudokuCell },
	data() {
		return {
			blockedButtons: false,
		};
	},
	methods: {
		...mapMutations("SudokuStore", ["setHoveredCoords"]),
	},
	computed: {
		...mapState("SudokuStore", ["subgridSize", "blocked"]),
		...mapGetters("SudokuStore", [
			"allRows",
			"maximumCount",
			"allSubGrids",
		]),
	},
};
</script>

<style scoped>
.SudokuGrid {
	width: min-content;
}
.Sudoku-cell {
	outline: 1px solid rgba(0, 0, 0, 0.5);
}

.subgrid {
	outline: 2px solid black;
}
</style>
