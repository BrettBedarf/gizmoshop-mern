import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import Rating from '../components/Rating';

import QuantitySelector from '../components/QuantitySelector';

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	useEffect(() => {
		(async () => {
			const { data } = await axios.get(
				`/api/products/${match.params.id}`
			);
			setProduct(data);
		})();
	});

	let inStock = product.countInStock === 0 ? false : true;

	return (
		<>
			{/* Back button link to home */}
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} fluid></Image>
				</Col>
				<Col md={6}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
							<Rating
								rating={product.rating}
								reviewCount={product.numReviews}
							></Rating>
						</ListGroup.Item>
						<ListGroup.Item>${product.price}</ListGroup.Item>
						<ListGroup.Item>{product.description}</ListGroup.Item>
						<ListGroup.Item>
							{/* Conditionally display quantity selector or out of stock */}
							{!inStock ? (
								<span style={{ color: 'red' }}>
									Out of Stock!
								</span>
							) : (
								<QuantitySelector
									currentQuantity={quantity}
									setQuantity={setQuantity}
								/>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button block disabled={!inStock ? true : false}>
								{' '}
								Add To Cart
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
