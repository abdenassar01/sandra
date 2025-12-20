import { ReactNode } from 'react';

export type TitleProps = {
	title: string;
	icon: ReactNode;
};

export function Title({ title, icon }: TitleProps) {
	return (
		<div className="flex gap-2 rounded-xl bg-primary/10 p-2 px-4 text-primary w-fit">
			{icon}
			<div>{title}</div>
		</div>
	);
}
