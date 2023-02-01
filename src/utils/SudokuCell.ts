export class SudokuCell {
	currentValue?: number | string;

	private _possibleValues: Set<number> = new Set();
	constructor(private _maximumElement: number) {
		for (let index = 1; index <= this._maximumElement; index++) {
			this._possibleValues.add(index);
		}
	}

	get possibleValues(): number[] {
		return [...this._possibleValues];
	}

	// If only one possible value, set it
	public checkPossibleValues(): SudokuCell {
		if (this._possibleValues.size === 1) {
			this._possibleValues.forEach((el) => {
				this.currentValue = el;
			});
			this.emptySet();
		}
		return this.getCopyValue();
	}

	public setCurrentValue(newValue: number | string): SudokuCell {
		if (newValue > 0 && newValue <= this._maximumElement) {
			this.currentValue = Number(newValue);
			this.emptySet();
		} else if (String(newValue).length < String(this.currentValue).length) {
			this.currentValue = newValue;
			this.emptySet();
		}
		return this.getCopyValue();
	}

	public removeImpossibleValue(deletedValue: number) {
		this._possibleValues.delete(deletedValue);
		return this.checkPossibleValues();
	}

	private getCopyValue(): SudokuCell {
		return Object.assign(new SudokuCell(this._maximumElement), this);
	}

	private emptySet() {
		this._possibleValues = new Set();
	}
}
