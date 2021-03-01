import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { Pizzas } from '../interfaces/Pizzas';
import { Topping } from '../interfaces/Topping';

interface Props {
  activeTopping: string;
}

const ToppingStyles = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 4rem;
	a {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 0 1rem;
		align-items: center;
		padding: 5px;
		background: var(--grey);
		border-radius: 2px;

		.count {
			background: white;
			padding: 2px 5px;
		}

		&[aria-current='page'] {
			background: var(--yellow);
		}
	}
`;

function countPizzasInToppings(pizzas: Pizzas) {
	// Return the pizzas with counts
	const counts = pizzas.nodes
		.map((pizza) => pizza.toppings)
		.flat()
		.reduce((acc, topping) => {
			// check if this is an existing topping
			const existingTopping = acc[topping.id];
			// if it is, increment by 1
			if (existingTopping) {
				existingTopping.count += 1;
			} else {
				// otherwise create new entry and set to 1
				acc[topping.id] = {
					id: topping.id,
					name: topping.name,
					count: 1,
				};
			}
			return acc;
		}, {});
	// sort based on their count
	const sortedToppings = Object.values(counts).sort(
		(a: Topping, b: Topping) => b.count - a.count
	);

	return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }: Props) {
	// get a list of all the toppings
	const { toppings, pizzas } = useStaticQuery(graphql`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
					vegetarian
				}
			}
			pizzas: allSanityPizza {
				nodes {
					toppings {
						name
						id
					}
				}
			}
		}
	`);
	console.clear();
	// get a list of all pizzas with their toppings
	// count how many pizzas are in each topping
	const toppingsWithCounts = countPizzasInToppings(pizzas);
	console.log(toppingsWithCounts);
	// loop over the list of toppings and display the topping and the count of pizzas in that topping
	// link it up...
	return (
		<ToppingStyles>
			<Link to='/pizzas'>
				<span className='name'>All</span>
				<span className='count'>{pizzas.nodes.length}</span>
			</Link>
			{toppingsWithCounts.map((topping: Topping) => (
				<Link
					to={`/topping/${topping.name}`}
					key={topping.id}
					className={topping.name === activeTopping ? 'active' : ''}>
					<span className='name'>{topping.name}</span>
					<span className='count'>{topping.count}</span>
				</Link>
			))}
		</ToppingStyles>
	);
}
