import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<>
			<Card.Text className='my-3 p-3 rounded'>
				<a href={`/product/${product.id}`}>
					<Card.Img src={product.image} variant='top' />
				</a>
				<Card.Body>
					<a href={`/product/${product.id}`}>
						<Card.Title as='div'>
							<strong>{product.name}</strong>
						</Card.Title>
					</a>
					<Card.Text as='div'>
						<div className='my-3'>
							<Rating
								rating={product.rating}
								reviewCount={product.numReviews}
							/>
						</div>
					</Card.Text>
					<Card.Text as='h3'>${product.price}</Card.Text>
				</Card.Body>
			</Card.Text>
		</>
	);
};

export default Product;
