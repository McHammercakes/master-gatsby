import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { SlicemasterStyles } from '../pages/slicemasters';
import styled from 'styled-components';
import SEO from '../components/SEO';

const WrapperStyles = styled.div`
	width: 400px;
	margin: 0 auto;
`;

export default function Slicemaster({ data, pageContext }) {
	const { slicemaster } = data;
	console.log(slicemaster);
	console.log(pageContext);
	return (
		<>
			<SEO title={slicemaster.name} image={slicemaster.image.asset.fluid.src} />
			<WrapperStyles>
				<SlicemasterStyles>
					<h2>
						<span className='mark'>{slicemaster.name}</span>
					</h2>
					<Img fluid={slicemaster.image.asset.fluid}></Img>
					<p className='description'>{slicemaster.description}</p>
				</SlicemasterStyles>
			</WrapperStyles>
		</>
	);
}

export const query = graphql`
	query($name: String!) {
		slicemaster: sanityPerson(name: { eq: $name }) {
			id
			name
			slug {
				current
			}
			description
			image {
				asset {
					fluid(maxWidth: 410) {
						...GatsbySanityImageFluid
					}
				}
			}
		}
	}
`;
