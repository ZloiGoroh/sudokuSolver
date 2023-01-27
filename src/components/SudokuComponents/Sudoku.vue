<template>
	<div class="Sudoku">
		<CustomSelect
			:value="subgridSize"
			@input="updateGridSize"
			emitValue
			:options="sizeOptions" />
		<SudokuGrid :sudokuSize="currentSize" />
		<button @click="countIteration">Начать всё это грязное дело</button>
	</div>
</template>

<script>
import SudokuGrid from "./SudokuGrid.vue";
import CustomSelect from "../custom/CustomSelect.vue";
import { mapActions, mapState } from "vuex";

export default {
	name: "SudokuWrapper",
	components: {
		SudokuGrid,
		CustomSelect,
	},
	data() {
		return {
			currentSize: 3,
			SudokuGrid: null,
			sizeOptions: [
				{
					value: 2,
					label: "2×2",
				},
				{
					value: 3,
					label: "3×3",
				},
				{
					value: 4,
					label: "4×4",
				},
			],
		};
	},
	computed: {
		...mapState("SudokuStore", ["subgridSize"]),
	},
	methods: {
		...mapActions("SudokuStore", ["updateGridSize", "countIteration"]),
	},
	created() {
		this.updateGridSize(this.subgridSize);
	},
};
</script>

<style scoped>
.Sudoku {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
