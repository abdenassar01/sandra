'use client';

import React from 'react';
import { useMDXComponents } from '@mdx-js/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	Home01FreeIcons,
	Building04FreeIcons,
	Wrench01FreeIcons,
	SparklesFreeIcons,
	CheckmarkCircle01FreeIcons,
} from '@hugeicons/core-free-icons';

const components = {
	h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text ${className || ''}`}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className={`text-2xl md:text-3xl font-bold mb-4 mt-8 text-text ${className || ''}`}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className={`text-xl md:text-2xl font-semibold mb-3 mt-6 text-text ${className || ''}`}
			{...props}
		/>
	),
	p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className={`text-base text-text/80 leading-relaxed mb-4 ${className || ''}`} {...props} />
	),
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className={`list-disc list-inside space-y-2 mb-4 text-text/80 ${className || ''}`} {...props} />
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol className={`list-decimal list-inside space-y-2 mb-4 text-text/80 ${className || ''}`} {...props} />
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
		<li className={`text-text/80 ${className || ''}`} {...props} />
	),
	a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<a
			className={`text-primary hover:text-primary/80 underline transition-colors ${className || ''}`}
			{...props}
		/>
	),
	strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<strong className={`font-semibold text-text ${className || ''}`} {...props} />
	),
	em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<em className={`italic text-text/90 ${className || ''}`} {...props} />
	),
	blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<blockquote
			className={`border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg ${className || ''}`}
			{...props}
		/>
	),
	code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<code
			className={`bg-black/10 px-2 py-1 rounded text-sm font-mono text-text ${className || ''}`}
			{...props}
		/>
	),
	pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
		<pre
			className={`bg-black/10 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono ${className || ''}`}
			{...props}
		/>
	),
	hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="border-secondary/20 my-8" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<table className={`w-full border-collapse mb-4 ${className || ''}`} {...props} />
	),
	thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<thead className="bg-primary/10" {...props} />
	),
	tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<tbody {...props} />
	),
	tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr className="border-b border-secondary/20" {...props} />
	),
	th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<th className={`px-4 py-2 text-left text-text font-semibold ${className || ''}`} {...props} />
	),
	td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td className={`px-4 py-2 text-text/80 ${className || ''}`} {...props} />
	),
	// Custom components
	Checklist: ({ items }: { items: string[] }) => (
		<ul className="space-y-2 mb-4">
			{items.map((item, index) => (
				<li key={index} className="flex items-start gap-2 text-text/80">
					<HugeiconsIcon icon={CheckmarkCircle01FreeIcons} className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
					<span>{item}</span>
				</li>
			))}
		</ul>
	),
	ServiceCard: ({
		icon,
		title,
		children,
	}: {
		icon: 'home' | 'office' | 'deep' | 'post-construction';
		title: string;
		children: React.ReactNode;
	}) => {
		const iconMap = {
			home: Home01FreeIcons,
			office: Building04FreeIcons,
			deep: SparklesFreeIcons,
			'post-construction': Wrench01FreeIcons,
		};
		const IconComponent = iconMap[icon];

		return (
			<div className="bg-background-secondary rounded-2xl p-6 border border-secondary/20 hover:shadow-lg transition-all duration-300">
				<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
					<HugeiconsIcon icon={IconComponent} className="w-8 h-8 text-primary" />
				</div>
				<h3 className="text-xl font-semibold text-text mb-3">{title}</h3>
				<div className="text-text/70">{children}</div>
			</div>
		);
	},
};

export function MDXProvider({ children }: { children: React.ReactNode }) {
	const mdxComponents = useMDXComponents(components);
	return <>{children}</>;
}

export default components;
