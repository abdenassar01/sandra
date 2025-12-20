import {
	About,
	HeroSection,
	ServicesSection,
	WhyChooseUsSection,
	TestimonialsSection
} from '@/components';

export default function Home() {
	return (
		<div className="flex flex-col gap-4">
			<HeroSection />
			<ServicesSection />
			<WhyChooseUsSection />
			<About />
			<TestimonialsSection />
		</div>
	);
}
