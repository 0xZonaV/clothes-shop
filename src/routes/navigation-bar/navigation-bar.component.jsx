import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwmLogo} from "../../assets/crown.svg";
import './navigation-bar.styles.scss';
import {UserContext} from "../../context/user-context/user.context";
import {userSignOut} from "../../utils/firebase/firebase.utils";

const NavigationBar = () => {
    const {currentUser} = useContext(UserContext);

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
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default NavigationBar;