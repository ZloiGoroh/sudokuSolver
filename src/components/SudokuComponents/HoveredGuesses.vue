<template>
	<div class="available-values">
		<div class="guesses-title">Возможные варианты:</div>
		<div class="guesses-table common-grid">
			<div
				class="guess"
				:class="{
					'available-value':
						hoveredValue &&
						hoveredValue.possibleValues.includes(index),
				}"
				v-for="index in maximumCount"
				:key="index">
				{{ index }}
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
	name: "HoveredGuesses",
	computed: {
		...mapState("SudokuStore", ["hoveredItem", "cellsMap"]),
		...mapGetters("SudokuStore", ["maximumCount"]),
		hoveredValue() {
			return this.cellsMap.get(this.hoveredItem);
		},
	},
};
</script>

<style scoped>
.available-values {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 32px;
}
.guesses-table {
	width: min-content;
	margin-top: 16px;
	gap: 4px;
}
.guess {
	width: 40px;
	height: 40px;
	display: flex;
	font-size: 18px;
	justify-content: center;
	align-items: center;
	background-color: #d8d8d8;
	color: rgba(0, 0, 0, 0.5);
	border-radius: 5px;
}
.available-value {
	color: black;
	background-color: white;
}
</style>
