import HomePage from "./routes/home/home-page.component";
import {Route, Routes} from "react-router-dom";
import NavigationBar from "./routes/navigation-bar/navigation-bar.component";
import ShopPage from "./routes/shop/shop-page.component";

const App = () => {

  return (
      <Routes>
        <Route path='/' element={<NavigationBar />}>
            <Route index element={<HomePage />} />
            <Route path='shop' element={<ShopPage />} />
        </Route>
      </Routes>

  );
}

export default App;
