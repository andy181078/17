import React from 'react';

import ProductsAll from '../components/ProductsAll';
import goodsArr from "../goodsArr.json";


class Page_ProductsAll extends React.PureComponent {
          
  render() {

    return (
      <ProductsAll
      goods={goodsArr}
      />
    );
    
  }

}
    
export default Page_ProductsAll;
    