<template>
	<div
		class="sudoku-grid-cell"
		@mouseenter="setHoveredCoords({ x: xCoordinate, y: yCoordinate })">
		<input
			type="text"
			ref="cellInput"
			:disabled="disabled"
			v-model="inputValue"
			@keydown.up="cellRefocus('up')"
			@keydown.down="cellRefocus('down')"
			@keydown.right="cellRefocus('right')"
			@keydown.left="cellRefocus('left')"
			@input="inputCallback" />
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
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
		...mapMutations("SudokuStore", [
			"setHoveredCoords",
			"setFocusedCoords",
		]),
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
		getNewFocusedCoordinate(newCoordinate) {
			return Math.min(this.maximumCount, Math.max(newCoordinate, 0));
		},
		cellRefocus(direction) {
			switch (direction) {
				case "up":
					return this.setFocusedCoords({
						x: this.getNewFocusedCoordinate(this.xCoordinate - 1),
						y: this.yCoordinate,
					});
				case "down":
					return this.setFocusedCoords({
						x: this.getNewFocusedCoordinate(this.xCoordinate + 1),
						y: this.yCoordinate,
					});
				case "right":
					if (
						this.$refs.cellInput.selectionStart ===
						String(this.inputValue).length
					) {
						this.setFocusedCoords({
							x: this.xCoordinate,
							y: this.getNewFocusedCoordinate(
								this.yCoordinate + 1
							),
						});
					}
					return;
				case "left":
					if (this.$refs.cellInput.selectionStart === 0) {
						this.setFocusedCoords({
							x: this.xCoordinate,
							y: this.getNewFocusedCoordinate(
								this.yCoordinate - 1
							),
						});
					}
					return;
			}
		},
	},
	computed: {
		...mapState("SudokuStore", ["cellsMap", "focusedItem"]),
		...mapGetters("SudokuStore", ["maximumCount"]),
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
		focusedItem(nv) {
			if (nv === getCellCoords(this.xCoordinate, this.yCoordinate)) {
				this.$refs.cellInput.focus();
			}
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
