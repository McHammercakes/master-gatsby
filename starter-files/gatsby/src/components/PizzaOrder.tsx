import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import Img from 'gatsby-image';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import { Order } from '../interfaces/Order';
import { Pizzas } from '../interfaces/Pizzas';

interface Props {
  order: Array<Order>;
  pizzas: Pizzas;
  removeFromOrder: Function;
}

export default function PizzaOrder({ order, pizzas, removeFromOrder }: Props) {
	return (
		<>
			{order.map((singleOrder, i) => {
				const pizza = pizzas.nodes.find((pizza) => pizza.id === singleOrder.id);
				return (
					<MenuItemStyles key={`singleOrder.id}-${i}`}>
						<Img fluid={pizza.image.asset.fluid} />
						<h2>{pizza.name}</h2>
						<p>
							{formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
							<button
								type='button'
								className='remove'
								title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
								onClick={() => removeFromOrder(i)}>
								&times;
							</button>
						</p>
					</MenuItemStyles>
				);
			})}
		</>
	);
}
