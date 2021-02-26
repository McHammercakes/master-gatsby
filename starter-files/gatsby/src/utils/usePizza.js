import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNameAndPrices from './attachNameAndPrices';
import calculateOrderTotal from './calculateOrderTotal';

export default function usePizza({ pizzas, values }) {
	// 1. Create some state to hold order
	// const [order, setOrder] = useState([]);
	const [order, setOrder] = useContext(OrderContext);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	// 2. make a function to add things to order
	function addToOrder(orderedPizza) {
		setOrder([...order, orderedPizza]);
	}
	// 3. make a function to remove things from order
	function removeFromOrder(index) {
		setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
	}

	async function submitOrder(e) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		// Gather all the data that needs to be sent
		const body = {
			order: attachNameAndPrices(order, pizzas),
			total: calculateOrderTotal(order, pizzas),
			name: values.name,
			email: values.email,
			mapleSyrup: values.mapleSyrup,
		};

		const res = await fetch(
			`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);
		const text = JSON.parse(await res.text());

		// check if everything worked
		if (res.status >= 400 && res.status < 600) {
			setLoading(false);
			setError(text.message);
		} else {
			setLoading(false);
			setMessage('Success! Come on down for your pizza!');
		}
	}
	// 4. Send this data to a serverless function when they check out

	return {
		order,
		addToOrder,
		removeFromOrder,
		error,
		loading,
		message,
		submitOrder,
	};
}
