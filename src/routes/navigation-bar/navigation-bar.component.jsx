import { Outlet} from "react-router-dom";
import {Fragment} from "react";
import {ReactComponent as CrwmLogo} from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {LogoContainer, NavigationStyled, NavLink, NavLinks} from "./navigation-bar.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user-selector";
import {selectIsCartOpen} from "../../store/cart/cart-selector";
import {signOutStart} from "../../store/user/user-action";

const NavigationBar = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen)
    const dispatch = useDispatch();

    const signOutHandler = async () => {
        dispatch(signOutStart());
    }


    return(
        <Fragment>
            <NavigationStyled>
                <LogoContainer to='/'>
                    <CrwmLogo className='logo' />
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>
                        {currentUser ? (
                            <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
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