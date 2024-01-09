/* eslint-disable react/prop-types */
import React from "react";
import { useState, useContext } from "react";

const CartContext = React.createContext('');
// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => useContext(CartContext);


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addProduct = (item, quantity) => {
        if (inCart(item.id)) {
            setCart(
                cart.map((product) =>{
                    return product.id === item.id ? { ...product, quantity: product.quantity + quantity } : product;
                })
            );
        } else {
            setCart([...cart, { ...item, quantity}]);
        }
    };

    const totalPrice = () => {return cart.reduce((previous, actual) => previous + actual.quantity * actual.price, 0)};

    const totalProducts = () => cart.reduce((acc, actualProduct) => acc + actualProduct.quantity, 0);

    const cleanCart = () => setCart([]);

    const inCart = (id) => cart.find((product) => product.id === id) ? true : false;

    const removeProduct = (id) => setCart(cart.filter((product) => product.id !== id));

    return (
        <CartContext.Provider
            value={{
                addProduct,
                totalPrice,
                totalProducts,
                cleanCart,
                inCart,
                removeProduct,
                cart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;
