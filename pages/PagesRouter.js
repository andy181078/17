import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Page_About from './Page_About';
import Page_ProductsAll from './Page_ProductsAll';
import Page_ProductCard from './Page_ProductCard';
import Page_Contacts from './Page_Contacts';


class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route path="/" exact component={Page_About} />
        <Route path="/products" component={Page_ProductsAll} />
        <Route path="/contacts" component={Page_Contacts} />
       <Route path="/product/:clid" component={Page_ProductCard} /> 
      </div>
    );
    
  }

}
    
export default PagesRouter;
    