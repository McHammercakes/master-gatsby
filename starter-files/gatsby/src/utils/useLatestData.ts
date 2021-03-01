import { useState, useEffect } from 'react';
import { Item } from '../interfaces/Item';

const gql = String.raw;

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
	// hot slices
	const [hotSlices, setHotSlices] = useState<Array<Item>>();
	// slicemasters
	const [slicemasters, setSlicemasters] = useState<Array<Item>>();
	// Use a side effect to fetcht he data from the graphql endpoint
	useEffect(function () {
		// when the component loads, fetch the data
		fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				// TODO: check for errors
				// set the data to state
				setHotSlices(res.data.StoreSettings.hotSlices);
				setSlicemasters(res.data.StoreSettings.slicemaster);
			})
			.catch((err) => {
				console.log('SHOOOOOT');
				console.log(err);
			});
	}, []);
	return {
		hotSlices,
		slicemasters,
	};
}
