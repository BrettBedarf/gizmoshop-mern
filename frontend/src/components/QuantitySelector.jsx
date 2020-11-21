import React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
	p {
		margin-bottom: 0;
	}
	input {
		width: 30%;
		text-align: center;
		margin-right: 1 rem;
	}
`;

const QuantitySelector = props => {
	function incrementQuantity(e) {
		let newQuantity;
		//treat falsy as 0
		props.currentQuantity
			? (newQuantity = props.currentQuantity + 1)
			: (newQuantity = 1);

		props.setQuantity(newQuantity);
	}

	function decrementQuantity(e) {
		if (props.currentQuantity > 0) {
			let newQuantity = props.currentQuantity - 1 || 0;
			props.setQuantity(newQuantity);
		}
	}

	function typeQuantity(e) {
		//set numbers and empty string only
		if (e.target.value === '') {
			props.setQuantity('');
		} else if (parseInt(e.target.value)) {
			props.setQuantity(parseInt(e.target.value));
		}
	}

	return (
		<StyleWrapper>
			<p>
				<label htmlFor='qty-input'>Quantity</label>
			</p>
			<Adjuster
				icon='/images/decrease.png'
				adjustHandler={decrementQuantity}
			></Adjuster>
			<input
				type='text'
				name='qty'
				id='qty-input'
				value={props.currentQuantity}
				onChange={typeQuantity}
			/>
			<Adjuster
				icon='/images/increase.png'
				adjustHandler={incrementQuantity}
			></Adjuster>
		</StyleWrapper>
	);
};

const Adjuster = styled.img.attrs(props => ({
	src: props.icon,
	onClick: props.adjustHandler,
}))`
	/* padding: 0px 2rem; */
	cursor: pointer;
	&:nth-of-type(1) {
		padding-right: 1rem;
	}
	&:nth-of-type(2) {
		padding-left: 1rem;
	}
	width: 2rem;
`;

export default QuantitySelector;
