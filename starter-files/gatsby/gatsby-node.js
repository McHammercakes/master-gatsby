import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
	// 1. get a template for this page
	const pizzaTemplate = path.resolve(`./src/templates/Pizza.js`);
	// 2. query all pizzas
	const { data } = await graphql(`
		query {
			pizzas: allSanityPizza {
				nodes {
					name
					slug {
						current
					}
				}
			}
		}
	`);
	// 3. loop over and create a page for each pizza
	data.pizzas.nodes.forEach((pizza) => {
		actions.createPage({
			path: `pizza/${pizza.slug.current}`,
			component: pizzaTemplate,
			context: {
				slug: pizza.slug.current,
			},
		});
	});
}

async function turnToppingsIntoPages({ graphql, actions }) {
	// 1. get the template
	const toppingTemplate = path.resolve(`./src/pages/pizzas.js`);
	// 2. query all toppings
	const { data } = await graphql(`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
				}
			}
		}
	`);
	// 3. createPage for that topping
	data.toppings.nodes.forEach((topping) => {
		actions.createPage({
			path: `topping/${topping.name}`,
			component: toppingTemplate,
			context: {
				topping: topping.name,
				toppingRegex: `/${topping.name}/i`,
			},
		});
	});
	// 4. passing topping data to pizza.js
}

// async function turnBeersIntoPages({ graphql, actions }) {
// 	const beersTemplate = path.resolve('./src/pages/beers.js');

// const { data } = graphql(`
// 	query {
// 		beers: allBeer {
// 			nodes {
// 				name
// 				price
// 				rating {
// 					reviews
// 					average
// 				}
// 			}
// 		}
// 	}
// `);

// data.beers.nodes.forEach(beer => {
//   actions.createPage({
//     path: `beers`
//   });
// })
// }

async function turnSliceMastersInfoPages({ graphql, actions }) {
	// 1. query all slicemaster
	const { data } = await graphql(`
		query {
			slicemasters: allSanityPerson {
				totalCount
				nodes {
					id
					name
					slug {
						current
					}
				}
			}
		}
	`);
	// TODO 2. turn each slicemaster into their own page
	// 3. figure out how many pages their are based on how many slicemasters and how many per page
	const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
	const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
	// 4. loop from 1 to n and create the pages for them
	Array.from({ length: pageCount }).forEach((_, i) => {
		console.log(`creating page ${i}`);
		actions.createPage({
			path: `/slicemasters/${i + 1}`,
			component: path.resolve('./src/pages/slicemasters.js'),
			context: {
				skip: i * pageSize,
				cuurentPage: i + 1,
				pageSize,
			},
		});
	});
}

async function fetchBeersAndTurnIntoNodes({
	actions,
	createNodeId,
	createContentDigest,
}) {
	// 1. fetch a list of beers
	const response = await fetch(`https://api.sampleapis.com/beers/stouts`);
	const beers = await response.json();
	// 2. loop over each one
	for (const beer of beers) {
		// create a node for each beer
		const nodeContent = JSON.stringify(beer);
		const nodeMeta = {
			id: createNodeId(`beer-${beer.name}`),
			parent: null,
			children: [],
			internal: {
				type: 'Beer',
				mediaType: 'application/json',
				// content: nodeContent,
				contentDigest: createContentDigest(beer),
			},
		};
		// 3. create a node for that beer
		actions.createNode({ ...beer, ...nodeMeta });
	}
}

export async function sourceNodes(params) {
	// fetch a list of beers and source them into our gatsby api
	await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
	// Create pages dynamically
	// wait for all promises to be resolved
	await Promise.all([
		turnPizzasIntoPages(params),
		turnToppingsIntoPages(params),
		turnSliceMastersInfoPages(params),
	]);
	// 1. Pizzas
	// 2. Toppings
	// 3. Slicemasters
}
