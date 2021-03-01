export interface Pizza {
	id: string;
	image: {
		asset: {
			fluid: {
				src: string;
			};
		};
	};
	name: string;
	price: number;
	slug: {
		current: string;
	};
	toppings?: Array<{
		id: string;
		name: string;
	}>;
}
