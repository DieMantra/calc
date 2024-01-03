import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { AnimatePresence, motion } from 'framer-motion';

export default function DisplayBoard() {
	return (
		<div className='flex flex-col gap-4 px-4 py-4 text-right text-white'>
			<Equation />
			<Evaluation />
		</div>
	);
}
function Equation() {
	const operatorRegex = /(\+|-|\(|\)|\*|%|\^|\/|x)/g;
	const count = useAppSelector((state) => state.digit.value);
	const formatedCount = count.replace(/\*/g, 'x');

	if (count.length === 0) return <p>0</p>;

	return (
		<div className='flex justify-end'>
			<AnimatePresence mode='popLayout'>
				{formatedCount.split('').map((character, i) => {
					const isOperator = character.match(operatorRegex);
					return (
						<motion.span
							key={`${character}-${i}`}
							variants={{
								initial: {
									y: -10,
									opacity: 0,
								},
								shown: {
									y: 0,
									opacity: 1,
								},
							}}
							transition={{ duration: 0.2, type: 'tween' }}
							className={cn(isOperator ? 'text-red-400 text-xl px-1' : 'text-2xl')}
							animate={'shown'}
							initial={'initial'}
							exit={'initial'}
						>
							{character}
						</motion.span>
					);
				})}
			</AnimatePresence>
		</div>
	);
}
function Evaluation() {
	const { evaluation: evaluationString, lastCharIsNumber } = useAppSelector(
		(state) => state.digit
	);
	const formatedEvaluation = evaluationString.includes('.')
		? (+evaluationString).toFixed(2)
		: evaluationString;

	return (
		<p
			className={cn(
				'overflow-hidden text-4xl whitespace-nowrap overflow-ellipsis ',
				lastCharIsNumber ? '' : 'opacity-50'
			)}
		>
			{evaluationString.length > 0 ? (+formatedEvaluation).toLocaleString() : '0'}
		</p>
	);
}
