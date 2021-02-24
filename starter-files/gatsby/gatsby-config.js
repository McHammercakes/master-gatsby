import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
	siteMetadata: {
		title: `Slick's Slices`,
		siteUrl: 'https://gatsby.pizza',
		description: 'The best pizza place ever',
		twitter: '@slicksSlices',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: 'mtt1seg6',
				dataset: 'production',
				watch: true,
				token: process.env.SANITY_TOKEN,
			},
		},
	],
};
