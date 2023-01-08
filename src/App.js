import HomePage from "./routes/home/home-page.component";
import {Route, Routes} from "react-router-dom";
import NavigationBar from "./routes/navigation-bar/navigation-bar.component";
import ShopPage from "./routes/shop/shop-page.component";
import Authentication from "./routes/authentication/authentication.component";
import CheckoutPage from "./routes/checkout/checkout-page.component";
import {useEffect} from "react";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user-action";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
    },[dispatch]);

  return (
      <Routes>
        <Route path='/' element={<NavigationBar />}>
            <Route index element={<HomePage />} />
            <Route path='shop/*' element={<ShopPage />} />
            <Route path='auth' element={<Authentication />} />
            <Route path='checkout' element={<CheckoutPage />} />
        </Route>
      </Routes>

  );
}

export default App;
