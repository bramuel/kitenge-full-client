import React, { lazy, Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./Login/Register";
import Login from "./Login/Login";
import CarouselItems from "./Desktop/CarouselItems";
import AddProduct from "./Products/AddProduct";
import ManageProducts from "./Products/ManageProducts";
import NavigationBar from "./Desktop/NavSections/NavigationBar";
import ProductDetail from "./Products/ProductDetail";
import CartScreen from "./Cart/CartScreen";
import ShippingScreen from "./Cart/ShippingScreen";


function App() {
  return (
    <div>
      <Router>      

<NavigationBar />
        <Switch>
        <Route path="/" exact component={CarouselItems} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/products/add" exact component={AddProduct} />
          <Route path="/produc/manage" exact component={ManageProducts} />
          <Route
              path="/product-detail/:id?"
              exact
              component={ProductDetail}/>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" exact component={ShippingScreen} />


        </Switch>
      </Router>
    </div>
  );
}

export default App;
