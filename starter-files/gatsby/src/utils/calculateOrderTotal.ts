import { Order } from '../interfaces/Order';
import { Pizza } from '../interfaces/Pizza';
import { Pizzas } from '../interfaces/Pizzas';
import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function calculateOrderTotal(
	order: Array<Order>,
	pizzas: Pizzas
) {
	const total = order.reduce((runningTotal: number, singleOrder: Order) => {
		const pizza: Pizza = pizzas.nodes.find(
			(singlePizza) => singlePizza.id === singleOrder.id
		);
		return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
	}, 0);
	return formatMoney(total);
}
