export const convertOrderItems = (orderItemsKeyVal) => {
  const keysArr = Object.keys(orderItemsKeyVal);
  return keysArr.map((key) => {
    return { product: key, ...orderItemsKeyVal[key] };
  });
};
