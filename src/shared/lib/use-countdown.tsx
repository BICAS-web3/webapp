import { useCallback } from 'react';

import { useBoolean } from './use-boolean';
import { useCounter } from './use-counter';
import { useInterval } from './use-interval';

interface CountdownHelpers {
	start: () => void;
	stop: () => void;
	reset: () => void;
}

interface CountdownOption {
	countStart: number;
	intervalMs?: number;
	isIncrement?: boolean;
	countStop?: number;
}

const useCountdown = (countdownOption: CountdownOption): [number, CountdownHelpers] => {
	const { countStart, intervalMs, isIncrement, countStop } = countdownOption;
	const { count, increment, decrement, reset: resetCounter } = useCounter(countStart);

	const { value: isCountdownRunning, setTrue: start, setFalse: stop } = useBoolean(false);

	const reset = () => {
		stop();
		resetCounter();
	};

	const countdownCallback = useCallback(() => {
		if (count === countStop) {
			stop();
			return;
		}

		if (isIncrement) {
			increment();
		} else {
			decrement();
		}
	}, [count, countStop, decrement, increment, isIncrement, stop]);

	useInterval(countdownCallback, isCountdownRunning ? intervalMs ?? null : null);

	return [
		count,
		{
			start,
			stop,
			reset,
		} as CountdownHelpers,
	];
};

export default useCountdown;
