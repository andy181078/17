"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
/*import ProductsAll from "./components/ProductsAll"
import goodsArr from "./goodsArr.json"*/

import PagesRouter from './pages/PagesRouter';
import PagesLinks from './pages/PagesLinks';

ReactDOM.render( 
  <BrowserRouter>
    <div>
      <PagesLinks />
      <PagesRouter />
    </div>
  </BrowserRouter>
, document.getElementById('container') );


/*ReactDOM.render(
    <ProductsAll goods={goodsArr} />
    , document.getElementById('container')
); */



