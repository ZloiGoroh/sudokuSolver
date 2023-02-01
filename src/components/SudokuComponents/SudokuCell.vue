<template>
	<div
		class="sudoku-grid-cell"
		@mouseenter="setHoveredCoords({ x: xCoordinate, y: yCoordinate })">
		<input
			type="text"
			:disabled="disabled"
			v-model="inputValue"
			@input="inputCallback" />
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { getCellCoords } from "@/store/sudokuStore/helpers";

export default {
	name: "SudokuCell",
	props: {
		xCoordinate: {
			type: Number,
			required: true,
		},
		yCoordinate: {
			type: Number,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			inputValue: "",
		};
	},
	methods: {
		...mapActions("SudokuStore", ["setCellValue"]),
		...mapMutations("SudokuStore", ["setHoveredCoords"]),
		inputCallback(evt) {
			this.setValue(evt.target.value);
		},
		setValue(value) {
			this.setCellValue({
				newValue: this.cellItem.setCurrentValue(value),
				x: this.xCoordinate,
				y: this.yCoordinate,
			});
		},
	},
	computed: {
		...mapState("SudokuStore", ["cellsMap"]),
		currentValue() {
			return this.cellItem?.currentValue;
		},
		cellItem() {
			return this.cellsMap.get(
				getCellCoords(this.xCoordinate, this.yCoordinate)
			);
		},
	},
	watch: {
		cellItem(nv) {
			this.inputValue = nv.currentValue;
		},
	},
};
</script>

<style scoped>
input {
	border: none;
	outline: none;
	text-align: center;
	width: 30px;
	height: 30px;
	font-size: 18px;
	padding: 0;
}
</style>
