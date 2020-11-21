import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';
import QuantitySelector from '../components/QuantitySelector';

const ProductScreen = ({ match }) => {
	const product = products.find(p => p._id === match.params.id);
	const [quantity, setQuantity] = useState(1);

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
							<QuantitySelector
								currentQuantity={quantity}
								setQuantity={setQuantity}
							/>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button block> Add To Cart</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
