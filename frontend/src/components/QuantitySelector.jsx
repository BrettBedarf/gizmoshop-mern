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

const QuantitySelector = (props) => {
  // const qtyInStock = useSelector(
  //   (state) => state.productDetails.product.countInStock
  // );
  const qtyInStock = props.maxQty;
  function incrementQuantity(e) {
    let newQuantity;
    //treat falsy as 0
    if (props.currentQuantity) {
      if (qtyInStock > props.currentQuantity) {
        newQuantity = props.currentQuantity + 1;
      } else {
        newQuantity = props.currentQuantity;
      }
    } else newQuantity = 1;

    props.setQuantity(newQuantity);
  }

  function decrementQuantity(e) {
    if (props.currentQuantity > 0) {
      let newQuantity = props.currentQuantity - 1 || 1;
      props.setQuantity(newQuantity);
    }
  }

  function typeQuantity({ target: { value: desiredQty } }) {
    //set numbers and empty string only
    if (desiredQty === '') {
      props.setQuantity('');
    } else if (parseInt(desiredQty)) {
      desiredQty <= qtyInStock
        ? props.setQuantity(parseInt(desiredQty))
        : props.setQuantity(qtyInStock);
    }
  }

  return (
    <StyleWrapper>
      <p>
        <label htmlFor="qty-input">Quantity</label>
      </p>
      <Adjuster
        icon="/images/decrease.png"
        adjustHandler={decrementQuantity}
      ></Adjuster>
      <input
        type="text"
        name="qty"
        id="qty-input"
        value={props.currentQuantity}
        onChange={typeQuantity}
      />
      <Adjuster
        icon="/images/increase.png"
        adjustHandler={incrementQuantity}
      ></Adjuster>
    </StyleWrapper>
  );
};

const Adjuster = styled.img.attrs((props) => ({
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
