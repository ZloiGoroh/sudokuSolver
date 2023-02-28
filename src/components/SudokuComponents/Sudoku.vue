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
				<button @click="subGroupIteration">Просчёт исключений</button>
				<button @click="countRowsUnique">Просчёт рядов</button>
				<button @click="countColumnsUnique">Просчёт колонн</button>
				<button @click="countSubGridsUnique">Просчёт подтаблиц</button>
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
import { mapActions, mapGetters, mapState } from "vuex";
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
		...mapGetters("SudokuStore", ["getCellByCoords"]),
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
			"subGroupIteration",
			"setCellValue",
			"countRowsUnique",
			"countColumnsUnique",
			"countSubGridsUnique",
		]),
		setTestValues() {
			this.setItemValue(0, 1, 3);
			this.setItemValue(0, 2, 9);
			this.setItemValue(0, 3, 5);
			this.setItemValue(1, 3, 8);
			this.setItemValue(2, 4, 1);
			this.setItemValue(2, 6, 9);
			this.setItemValue(1, 7, 7);
			this.setItemValue(3, 0, 1);
			this.setItemValue(3, 3, 4);
			this.setItemValue(3, 8, 3);
			this.setItemValue(5, 2, 7);
			this.setItemValue(5, 6, 8);
			this.setItemValue(5, 7, 6);
			this.setItemValue(6, 2, 6);
			this.setItemValue(6, 3, 7);
			this.setItemValue(6, 5, 8);
			this.setItemValue(6, 6, 2);
			this.setItemValue(7, 1, 1);
			this.setItemValue(7, 4, 9);
			this.setItemValue(7, 8, 5);
			this.setItemValue(8, 5, 1);
			this.setItemValue(8, 8, 8);
		},
		testValues2() {
			this.setItemValue(0, 0, 4);
			this.setItemValue(0, 2, 3);
			this.setItemValue(0, 5, 2);
			this.setItemValue(1, 0, 5);
			this.setItemValue(1, 4, 6);
			this.setItemValue(1, 6, 1);
			this.setItemValue(1, 7, 2);
			this.setItemValue(2, 0, 9);
			this.setItemValue(2, 8, 4);
			this.setItemValue(3, 2, 8);
			this.setItemValue(3, 4, 7);
			this.setItemValue(4, 3, 2);
			this.setItemValue(4, 5, 3);
			this.setItemValue(4, 8, 8);
			this.setItemValue(5, 1, 3);
			this.setItemValue(5, 2, 6);
			this.setItemValue(5, 6, 7);
			this.setItemValue(6, 1, 7);
			this.setItemValue(6, 3, 9);
			this.setItemValue(6, 4, 2);
			this.setItemValue(7, 5, 5);
			this.setItemValue(7, 7, 9);
			this.setItemValue(7, 8, 6);
			this.setItemValue(8, 3, 8);
			this.setItemValue(8, 5, 4);
			this.setItemValue(8, 6, 5);
		},
		setItemValue(x, y, val) {
			this.setCellValue({
				newValue: this.getCellByCoords(x, y).setCurrentValue(val),
				x,
				y,
			});
		},
	},
	created() {
		this.updateGridSize(this.subgridSize);
		setTimeout(() => {
			this.testValues2();
		});
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
	flex-wrap: wrap;
}
</style>
