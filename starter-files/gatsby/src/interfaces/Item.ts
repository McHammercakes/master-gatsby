export interface Item {
	_id: string;
	name: string;
	image: {
		asset: {
			url: string;
			metadata: {
				lqip: string;
			};
		};
	};
}

export interface Items {
	items: Array<Item>;
}
