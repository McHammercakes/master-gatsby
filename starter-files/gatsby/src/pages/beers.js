import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
	border: 1px solid var(--grey);
	padding: 2rem;
	text-align: center;
	img {
		display: grid;
		align-items: center;
		font-size: 10px;
		width: 100%;
		height: 200px;
		object-fit: contain;
	}
`;

export default function BeersPage({ data }) {
	const { beers } = data;
	return (
		<div>
			<h2 className='center'>
				We have {beers.nodes.length} Beers Available. Dine in Only!
			</h2>
			<BeerGridStyles>
				{beers.nodes.map((beer) => {
					const ratings = Math.round(beer.rating.average);
					return (
						<SingleBeerStyles key={beer.id}>
							<img src={beer.image} alt={beer.name} />
							<h3>{beer.name}</h3>
							{beer.price}
							<p title={`${ratings} out of 5 stars`}>
								{`⭐`.repeat(ratings)}
								<span style={{ filter: `grayscale(100%)` }}>
									{`⭐`.repeat(5 - ratings)}
								</span>
								<span>({beer.rating.reviews})</span>
							</p>
						</SingleBeerStyles>
					);
				})}
			</BeerGridStyles>
		</div>
	);
}

export const query = graphql`
	query {
		beers: allBeer {
			nodes {
				id
				name
				price
				image
				rating {
					reviews
					average
				}
			}
		}
	}
`;
