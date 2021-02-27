import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';
import { Order } from '../interfaces/Order';
import { Pizzas } from '../interfaces/Pizzas';
import { Pizza } from '../interfaces/Pizza';

export default function attachNameAndPrices(
	order: Array<Order>,
	pizzas: Pizzas
) {
	return order.map((item) => {
		const pizza: Pizza = pizzas.nodes.find(
			(singlePizza) => singlePizza.id === item.id
		);
		return {
			...item,
			name: pizza?.name,
			thumbnail: pizza?.image.asset.fluid.src,
			price: formatMoney(calculatePizzaPrice(pizza?.price, item.size)),
		};
	});
}
