import { state } from "@/store/sudokuStore/state";
import mutations from "@/store/sudokuStore/mutations";
import actions from "@/store/sudokuStore/actions";
import getters from "@/store/sudokuStore/getters";

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
