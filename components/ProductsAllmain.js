import React from 'react';
import PropTypes from 'prop-types';
import ProductsAll from '../components/ProductsAll';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combinedReducer from '../redux/reducers.js';

let store=createStore(combinedReducer);

class ProductsAllmain extends React.PureComponent {

  static propTypes={
    goods: PropTypes.array.isRequired,
     
}

  render() {

    return (
      <Provider store={store}>
          <div>  
              <ProductsAll  goods={this.props.goods}/>
          </div>
      </Provider>
    );

  }

}

export default ProductsAllmain;
