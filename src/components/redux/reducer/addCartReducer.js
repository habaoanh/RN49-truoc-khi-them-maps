import saveCart from '../../../api/saveCart';

const addCartReducer = (state = [], action) => {
    if (action.type === 'GET_FROM_MEMO') {
        return action.cartArray;
    }
    if (action.type === 'ADD_CART') {
       const Cart = [{
                product: action.product,
                quantity: 1,
            }].concat(state);
        saveCart(Cart);
        return Cart;
    }
    if (action.type === 'ADD') {
        const Cart = state.map(e => {
            if (e.product.id !== action.id) return e;
            return { ...e, quantity: e.quantity + 1 };
        });
        saveCart(Cart);
        return Cart;
    }
    if (action.type === 'SUB') {
        const Cart = state.map(e => {
            if (e.product.id !== action.id) return e;
            return { ...e, quantity: e.quantity - 1 };
        });
        saveCart(Cart);
        return Cart;
    }
    if (action.type === 'REMOVE') {
        const Cart = state.filter(e => e.product.id !== action.id);
        saveCart(Cart);
        return Cart;
    }
    return state;
};
export default addCartReducer;
