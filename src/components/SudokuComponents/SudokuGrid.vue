<template>
	<div
		class="SudokuGrid"
		:style="{ '--items-in-row': maximumCount }">
		<template v-for="(sudokuRow, index) in allItems">
			<div
				v-for="(_, idx) in sudokuRow"
				class="Sudoku-cell"
				:key="`el${index}/${idx}`">
				<SudokuCell
					:disabled="blockedButtons"
					:x-coordinate="idx"
					:y-coordinate="index" />
			</div>
		</template>
	</div>
</template>

<script>
import SudokuCell from "./SudokuCell.vue";
import { mapGetters } from "vuex";

export default {
	name: "SudokuGrid",
	components: { SudokuCell },
	data() {
		return {
			blockedButtons: false,
		};
	},
	computed: {
		...mapGetters("SudokuStore", ["allItems", "maximumCount"]),
	},
	methods: {},
};
</script>

<style scoped>
.SudokuGrid {
	display: grid;
	--items-in-row: 1;
	grid-template-columns: repeat(var(--items-in-row), 1fr);
	grid-template-rows: repeat(var(--items-in-row), 1fr);
}
.Sudoku-cell {
	border: 1px solid rgba(0, 0, 0, 0.5);
}
/* .Sudoku-cell:nth-child(3n) {
	border-right-color: black;
}

.Sudoku-cell:nth-child(9n) {
	border-right-color: rgba(0, 0, 0, 0.5);
} */
</style>
