import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { all, create } from 'mathjs';
const config = {};
const math = create(all, config);

interface CounterState {
	value: string;
	lastCharIsNumber: boolean;
	evaluation: string;
}

const initialState: CounterState = {
	value: '',
	lastCharIsNumber: false,
	evaluation: '',
};

const digitSlice = createSlice({
	name: 'counter',
	initialState: initialState,
	reducers: {
		addToStringNumber(state, action: PayloadAction<string>) {
			const lastChar = state.value[state.value.length - 1];
			const validOperators = ['+', '-', '*', '/', '%', '^', 'x', '^', '(', ')'];
			const isLastCharNumber = !isNaN(Number(lastChar));
			const isPayloadOperator = validOperators.includes(action.payload);
			state.lastCharIsNumber = !isPayloadOperator;

			if (state.value === '' && isPayloadOperator) {
				return;
			}
			if (lastChar === '.' && (action.payload === '.' || isPayloadOperator)) {
				return;
			}
			if (!isLastCharNumber && isPayloadOperator) {
				state.value = state.value.slice(0, -1) + action.payload;
			} else {
				state.value += action.payload;
			}
		},
		evaluate(state) {
			if (state.value === '') {
				state.evaluation = '';
				return;
			} else if (state.lastCharIsNumber) {
				const evaluatedNumber = math.evaluate(state.value);
				state.evaluation = evaluatedNumber.toString() || 'Error';
			} else {
				return;
			}
		},
		clear(state) {
			state.value = '';
			state.evaluation = '';
			state.lastCharIsNumber = false;
		},
		removeLastChar(state) {
			state.value = state.value.slice(0, -1);
			const lastChar = state.value[state.value.length - 1];
			const isLastCharNumber = !isNaN(Number(lastChar));
			state.lastCharIsNumber = isLastCharNumber;
		},
	},
});

export const { addToStringNumber, evaluate, clear, removeLastChar } = digitSlice.actions;

export default digitSlice.reducer;
