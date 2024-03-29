import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@components/ui/button';
import { addToStringNumber, clear, evaluate, removeLastChar } from '@store/digitSlice';
import { useAppDispatch } from '@store/hooks';
import {
	ChevronUp,
	Divide,
	Dot,
	Equal,
	Minus,
	Percent,
	Plus,
	Undo,
	X,
} from 'lucide-react';
import { ReactNode, useEffect } from 'react';

export default function DigitBoard() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const validOperators = ['+', '-', '*', '/', '%', '^', '^', '(', ')'];
			if (event.key === 'Backspace') {
				dispatch(removeLastChar());
			} else if (event.key === 'Escape') {
				dispatch(clear());
			} else if (!isNaN(+event.key)) {
				dispatch(addToStringNumber(event.key));
				dispatch(evaluate());
			} else if (event.key === '.') {
				dispatch(addToStringNumber('.'));
			} else if (validOperators.includes(event.key)) {
				dispatch(addToStringNumber(event.key));
			} else if (event.key === '=') {
				dispatch(evaluate());
			} else return;
		};

		window.addEventListener('keydown', handleKeyDown);
		// Cleanup function to remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [dispatch]);
	return (
		<div className='grid flex-shrink-0 grid-cols-4 gap-5 p-5 pt-8 bg-gray-800 rounded-t-3xl'>
			<OperatorButton value='AC' className='text-red-400'>
				AC
			</OperatorButton>
			<OperatorButton value='%' className='text-red-400'>
				<Percent />
			</OperatorButton>
			<OperatorButton value='/' className='text-red-400'>
				<Divide />
			</OperatorButton>
			<OperatorButton value='^' className='text-red-400'>
				<ChevronUp />
			</OperatorButton>
			<DigitButton value='7'>7</DigitButton>
			<DigitButton value='8'>8</DigitButton>
			<DigitButton value='9'>9</DigitButton>
			<OperatorButton value='*' className='text-green-400'>
				<X />
			</OperatorButton>
			<DigitButton value='4'>4</DigitButton>
			<DigitButton value='5'>5</DigitButton>
			<DigitButton value='6'>6</DigitButton>
			<OperatorButton value='-' className='text-green-400'>
				<Minus />
			</OperatorButton>
			<DigitButton value='1'>1</DigitButton>
			<DigitButton value='2'>2</DigitButton>
			<DigitButton value='3'>3</DigitButton>
			<OperatorButton value='+' className='text-green-400'>
				<Plus />
			</OperatorButton>
			<UndoButton />
			<DigitButton value='0'>0</DigitButton>
			<DigitButton value='.'>
				<Dot />
			</DigitButton>
			<OperatorButton
				value='='
				className='text-green-400'
				onClick={() => {
					dispatch(evaluate());
				}}
			>
				<Equal />
			</OperatorButton>
		</div>
	);
}

function DigitButton(props: { children: ReactNode; value: string }) {
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(addToStringNumber(props.value));
		dispatch(evaluate());
	};

	return (
		<Button
			className='size-14 bg-gray-900/25 active:bg-gray-900/50'
			onClick={handleClick}
		>
			{props.children}
		</Button>
	);
}

function OperatorButton(props: { children: ReactNode; value: string } & ButtonProps) {
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(addToStringNumber(props.value));
		if (props.value === '%') {
			dispatch(evaluate());
		} else if (props.value === 'AC') {
			dispatch(clear());
		}
	};
	return (
		<Button
			onClick={handleClick}
			{...props}
			className={cn('size-14 bg-gray-900/25', props.className)}
		>
			{props.children}
		</Button>
	);
}
function UndoButton() {
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(removeLastChar());
		dispatch(evaluate());
	};
	return (
		<Button onClick={handleClick} className='size-14 bg-gray-900/25'>
			<Undo />
		</Button>
	);
}
