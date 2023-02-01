<template>
	<div
		class="Sudoku"
		:style="{ '--items-in-row': subgridSize }">
		<div class="sudoku-container">
			<SudokuGrid />
		</div>
		<div class="settings">
			<div class="first-row">
				<CustomSelect
					:value="subgridSize"
					@input="updateGridSize"
					emitValue
					:options="sizeOptions" />
				<button
					class="custom-button"
					@click="countIteration">
					Начать просчёт
				</button>
				<button
					class="custom-button"
					@click="resetGrid">
					Очистить таблицу
				</button>
			</div>
			<hovered-guesses />
		</div>
	</div>
</template>

<script>
import SudokuGrid from "./SudokuGrid.vue";
import CustomSelect from "../custom/CustomSelect.vue";
import { mapActions, mapState } from "vuex";
import HoveredGuesses from "@/components/SudokuComponents/HoveredGuesses";

export default {
	name: "SudokuWrapper",
	components: {
		HoveredGuesses,
		SudokuGrid,
		CustomSelect,
	},
	computed: {
		...mapState("SudokuStore", ["subgridSize"]),
		sizeOptions() {
			return [
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
			];
		},
	},
	methods: {
		...mapActions("SudokuStore", [
			"updateGridSize",
			"countIteration",
			"resetGrid",
		]),
	},
	created() {
		this.updateGridSize(this.subgridSize);
	},
};
</script>

<style scoped>
.Sudoku {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.sudoku-container {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 32px 16px;
}

.settings {
	padding: 32px 16px;
}

.first-row {
	display: flex;
	gap: 32px;
}
</style>
