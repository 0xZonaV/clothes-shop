import './cart-dropdown.style.scss';
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart-selector";
import {FC} from "react";

const CartDropdown: FC = () => {
    const cartItems = useSelector(selectCartItems);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem key={item.id}  cartItem={item} />
                ))}
            </div>
            <Link to='/checkout'>
                <Button>Buy</Button>
            </Link>
        </div>
    );
};

export default CartDropdown;