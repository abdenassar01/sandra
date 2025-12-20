import { About, HeroSection } from '@/components';

export default function Home() {
	return (
		<div className="flex flex-col gap-4">
			<HeroSection />
			<About />
		</div>
	);
}
