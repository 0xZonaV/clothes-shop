import HomePage from "./routes/home/home-page.component";
import {Route, Routes} from "react-router-dom";
import NavigationBar from "./routes/navigation-bar/navigation-bar.component";
import ShopPage from "./routes/shop/shop-page.component";
import Authentication from "./routes/authentication/authentication.component";
import CheckoutPage from "./routes/checkout/checkout-page.component";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {checkUserSession} from "./store/user/user-action";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    },[]);

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
