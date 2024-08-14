import { getCart, setCart } from "../utils/storage";

export function AddCart(data) {
  const indexValue = getCart().findIndex((item) => item._id === data._id);
  if (indexValue !== -1) {
    if (getCart()[indexValue].quantity < data.maxOrderQuantity) {
      const updatedCart = getCart().map((item, index) =>
        index === indexValue
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.price * (item.quantity+1),
            }
          : item
      );
      setCart(updatedCart);
      return true;
    } else {
      return false;
    }
  } else {
    setCart([...getCart(), { ...data, quantity: 1,totalPrice:data.price*1 }]);
    return true;
  }
}

export function RemoveCart(data) {
  const indexValue = getCart().findIndex((item) => item._id === data._id);
  if (getCart()[indexValue].quantity > 1) {
    if (indexValue !== -1) {
      const updatedCart = getCart().map((item, index) =>
        index === indexValue
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.price * (item.quantity - 1),
            }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...getCart(), { ...data, quantity: 1, totalPrice:data.price* 1}]);
    }
    return true;
  } else {
    const updatedCart = getCart().map((item, index) =>
      index === indexValue ? { ...item, quantity: item.quantity - 1 } : item
    );
    const value = updatedCart.filter((val) => val.quantity > 0);
    setCart(value);
    return true;
  }
}
