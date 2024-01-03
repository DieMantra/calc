import { cn } from '@/lib/utils';
import DigitBoard from '@components/DigitBoard';
import DisplayBoard from './DisplayBoard';

export default function Board() {
	return (
		<div
			className={cn(
				'max-w-[376px] max-h-dvh sm:max-h-[700px] w-full flex flex-col h-full',
				'relative bg-slate-950 z-10',
				'rounded-3xl shadow-2xl'
			)}
		>
			<div className='absolute -z-10 h-full w-full bg-[radial-gradient(#041831_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>
			<DisplayBoard />
			<DigitBoard />
		</div>
	);
}
