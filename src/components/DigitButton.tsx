import { Button, ButtonProps } from '@components/ui/button';

interface Props extends ButtonProps {}

export default function NumberButton(props: Props) {
	return (
		<Button className='size-12 bg-gray-900/25' {...props}>
			{props.children}
		</Button>
	);
}
