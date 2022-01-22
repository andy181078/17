import React from "react";
import PropTypes from 'prop-types';
import {mobileEvents} from './events';

import "./ProductCard.css"

class ProductCard extends React.PureComponent{
   
  static propTypes = {
    row:PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      quant: PropTypes.number.isRequired
    }),
  };
   

    render(){
        console.log("product card render");
        return(
            <div className="ProductCard">
                <h1>{this.props.row.name}</h1>
                <img src={this.props.row.url} className="ProductImg"/>
                <div className="ProductEach">Цена: {this.props.row.price}</div>
                <div className="ProductEach">Количество: {this.props.row.quant}</div>
            </div>
        )
    }
}

export default ProductCard


/*static propTypes = {
    info:PropTypes.shape({
      fio: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  render() {

    return (
      <h1>
        клиент &laquo;{this.props.info.fio}&raquo;, баланс {this.props.info.balance}
      </h1>
    )
    ;

  } */