import './cart-dropdown.style.scss';
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useContext} from "react";
import {ItemsContext} from "../../context/items-context/items.context";

const CartDropdown = () => {

    const { cartItems } = useContext(ItemsContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem key={item.id}  cartItem={item} />
                ))}
            </div>
            <Button>GO</Button>
        </div>
    );
};

export default CartDropdown;