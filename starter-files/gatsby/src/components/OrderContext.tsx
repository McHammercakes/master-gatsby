import React, { useState } from 'react';
import { Order } from '../interfaces/Order';

const OrderContext = React.createContext([]);

export function OrderProvider({ children }) {
	// stick state in here
	const [order, setOrder] = useState<Array<Order>>([]);
  console.log(order)
	return (
		<OrderContext.Provider value={[order, setOrder]}>
			{children}
		</OrderContext.Provider>
	);
}

export default OrderContext;
