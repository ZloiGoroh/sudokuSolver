<template>
	<div class="CustomSelect">
		<div class="selected-value">
			<input
				@focus="opened = true"
				@blur="opened = false"
				type="text"
				readonly
				:value="selectedValueLabel" />
		</div>
		<div
			v-if="opened"
			class="options-container">
			<div
				class="option"
				@mousedown="setNewValue(option)"
				v-for="option in options"
				:key="option[valueKey]">
				{{ option[labelKey] }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CustomSelect",
	props: {
		value: {
			default: null,
		},
		options: {
			required: true,
			type: Array,
			default: () => [],
		},
		// Have to be unique
		valueKey: {
			type: String,
			default: "value",
		},
		labelKey: {
			type: String,
			default: "label",
		},
		// Wether you need the whole object or only value
		emitValue: {
			type: Boolean,
			default: false,
		},
		selectValueMessage: {
			type: String,
			default: "Выберите из списка",
		},
	},
	data() {
		return {
			opened: false,
		};
	},
	computed: {
		selectedValueLabel() {
			if (!this.value) return this.selectValueMessage;
			return (
				this.options.find((option) => option.value === this.value)
					?.label || ""
			);
		},
	},
	methods: {
		setNewValue(option) {
			this.$emit(
				"input",
				this.emitValue ? option[this.valueKey] : option
			);
		},
	},
};
</script>

<style scoped>
.CustomSelect {
	width: 80px;
	position: relative;
}

.selected-value {
	position: relative;
	border: 1px solid rgb(7, 155, 253);
	box-sizing: border-box;
	border-radius: 5px;
	overflow: hidden;
}
.selected-value input {
	border: none;
	text-align: center;
	outline: none;
	width: 100%;
	height: 40px;
	font-size: 20px;
	padding: 0;
	cursor: pointer;
}

.selected-value::after {
	content: "▼";
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}

.options-container {
	position: absolute;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: 30px;
	gap: 8px;
	background-color: aqua;
	overflow: hidden;
	border-radius: 5px;
}

.option {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}
.option:hover {
	background-color: cadetblue;
}
</style>
