import {Route, Routes} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import {useDispatch} from "react-redux";
import {checkUserSession} from "./store/user/user-action";

import Spinner from "./components/loading-spinner/spinner.component";

const NavigationBar = lazy(() => import ("./routes/navigation-bar/navigation-bar.component"));
const ShopPage = lazy(() => import ("./routes/shop/shop-page.component"));
const Authentication = lazy(() => import ("./routes/authentication/authentication.component"));
const CheckoutPage = lazy(() => import ("./routes/checkout/checkout-page.component"));
const HomePage = lazy(() => import ("./routes/home/home-page.component"));

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    },[]);

  return (
      <Suspense fallback={<Spinner />} >
          <Routes>
            <Route path='/' element={<NavigationBar />}>
                <Route index element={<HomePage />} />
                <Route path='shop/*' element={<ShopPage />} />
                <Route path='auth' element={<Authentication />} />
                <Route path='checkout' element={<CheckoutPage />} />
            </Route>
          </Routes>
      </Suspense>
  );
}

export default App;
