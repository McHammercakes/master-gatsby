interface Sizes {
	S: number;
	M: number;
	L: number;
}

const sizes: Sizes = {
	S: 0.75,
	M: 1,
	L: 1.25,
};

export default function calculatePizzaPrice(
	cents: number,
	size: string
): number {
	return cents * sizes[size];
}
