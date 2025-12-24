import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
