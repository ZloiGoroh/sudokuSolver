<template>
	<div id="app">
		<Sudoku />
	</div>
</template>

<script>
import Sudoku from "./components/SudokuComponents/Sudoku.vue";
export default {
	name: "App",
	components: {
		Sudoku,
	},
};
</script>

<style>
body {
	margin: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100vh;
}
.common-grid {
	display: grid;
	grid-template-columns: repeat(var(--items-in-row), 1fr);
	grid-template-rows: repeat(var(--items-in-row), 1fr);
}
</style>
