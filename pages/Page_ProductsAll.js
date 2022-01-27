import React from 'react';

import ProductsAllmain from '../components/ProductsAllmain';
import goodsArr from "../goodsArr.json";



class Page_ProductsAll extends React.PureComponent {
          
  render() {

    return (
      <ProductsAllmain
      goods={goodsArr}
      />
    );
    
  }

}
    
export default Page_ProductsAll;
    