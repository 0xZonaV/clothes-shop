import { Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwmLogo} from "../../assets/crown.svg";
import {UserContext} from "../../context/user-context/user.context";
import {CartDropdownSwitchContext} from "../../context/cart-dropdown-switch/cart-dropdown-switch.context";
import {userSignOut} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {LogoContainer, NavigationStyled, NavLink, NavLinks} from "./navigation-bar.styles";

const NavigationBar = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartDropdownSwitchContext)

    return(
        <Fragment>
            <NavigationStyled>
                <LogoContainer to='/'>
                    <CrwmLogo className='logo' />
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>
                        {currentUser ? (
                            <NavLink as='span' onClick={userSignOut}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to='/auth'>SIGN IN</NavLink>
                        )}
                        <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationStyled>
            <Outlet />
        </Fragment>
    )
}

export default NavigationBar;