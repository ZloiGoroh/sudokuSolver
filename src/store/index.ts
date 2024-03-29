import Vue from "vue";
import Vuex from "vuex";
import SudokuStore from "@/store/sudokuStore";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		SudokuStore,
	},
});
