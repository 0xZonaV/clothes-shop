import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwmLogo} from "../../assets/crown.svg";
import './navigation-bar.styles.scss';
import {UserContext} from "../../context/user-context/user.context";
import {CartDropdownSwitchContext} from "../../context/cart-dropdown-switch/cart-dropdown-switch.context";
import {userSignOut} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const NavigationBar = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartDropdownSwitchContext)

    return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwmLogo className='logo' />
                </Link>

                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>SHOP</Link>
                        {currentUser ? (
                            <span className='nav-link' onClick={userSignOut}>SIGN OUT</span>
                        ) : (
                            <Link className='nav-link' to='/auth'>SIGN IN</Link>
                        )}
                        <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default NavigationBar;