import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';
import { Pizza } from '../interfaces/Pizza';

interface Props {
  data: {
    pizzas: {
      nodes: Array<Pizza>
    }
  }
  pageContext: any;
}

export default function PizzasPage({ data, pageContext }: Props) {
	const { pizzas } = data;
	return (
		<>
			<SEO
				title={
					pageContext.topping
						? `Pizzas with ${pageContext.topping}`
						: 'All Pizzas'
				}
			/>
			<ToppingsFilter activeTopping={pageContext.topping} />
			<PizzaList pizzas={pizzas} />
		</>
	);
}

export const query = graphql`
	query PizzaQuery($topping: [String]) {
		pizzas: allSanityPizza(
			filter: { toppings: { elemMatch: { name: { in: $topping } } } }
		) {
			nodes {
				name
				id
				slug {
					current
				}
				toppings {
					id
					name
				}
				image {
					asset {
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`;