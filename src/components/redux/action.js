export function getFromMemo(cartArray) {
    return { type: 'GET_FROM_MEMO', cartArray };
}
export function addCart(product, id) {
    return { type: 'ADD_CART', product, id };
}
export function Add(id) {
    return { type: 'ADD', id };
}
export function Sub(id) {
    return { type: 'SUB', id };
}
export function Remove(id) {
    return { type: 'REMOVE', id };
}
export function onSignIn(user) {
    return { type: 'ON_SIGN_IN', user };
}
