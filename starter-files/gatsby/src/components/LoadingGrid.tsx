import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

interface Count {
  count: number;
}

export default function LoadingGrid({ count }: Count) {
	return (
		<ItemsGrid>
			{Array.from({ length: count }, (_, i) => (
				<ItemStyles key={`loader-${i}`}>
					<p>
						<span className='mark'>Loading...</span>
					</p>
					<img
						src='data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII='
						className='loading'
						alt=''
						width='500'
						height='400'
					/>
				</ItemStyles>
			))}
		</ItemsGrid>
	);
}
