import React from "react";
import PropTypes from 'prop-types';
import DOM from 'react-dom';
import {mobileEvents} from './events';
import { NavLink } from 'react-router-dom';
import "./ProductRow.css"

class ProductRow extends React.Component{
    static propTypes ={
        isChanged: PropTypes.bool,
        isEdit: PropTypes.bool,
        row: PropTypes.object.isRequired,
        code: PropTypes.number.isRequired,
        selectedProductCode: PropTypes.number,
        
    }

    componentWillReceiveProps = (newProps) => {
        console.log("row id="+this.props.code+" componentWillReceiveProps");
        this.setState({row: newProps.row,
                       code: newProps.code,
                       selectedProductCode: newProps.selectedProductCode, 
                       isChanged: newProps.isChanged, 
                       isEdit: newProps.isEdit 
                                         });
        
      };

    state ={
        row: this.props.row,
        code: this.props.code,
        selectedProductCode: this.props.selectedProductCode,
        isChanged: this.props.isChanged, 
        isEdit: this.props.isEdit
    }

   
    
  
    evCardView=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvCardView', this.state.code)
    }

    evEdit=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvEdit', this.state.code)
    }

    evDelete=(EO)=>{
        EO.stopPropagation();
        mobileEvents.emit('EvDelete', this.state.code)
    }

    render(){
        console.log("row id="+this.state.code+" render");

        return (
            <tr className={(this.state.selectedProductCode!==this.state.code)?'ProductRow':'ProductRow ProductRowSelect'} onClick={this.evCardView} key={this.state.code}>             
            <td className='Main'> 
                         
            <NavLink to={"/product/"+this.state.code} className="PageLink" activeClassName="ActivePageLink">{this.state.row.name}</NavLink>
            
            </td> 
            <td className='Main'>{this.state.row.price}</td>
            <td className='Main'>{this.state.row.url}</td>
            <td className='Main1'>{this.state.row.quant}</td>
            <td className='Main'>
                <input type='button' value='Исправить' className='EditButton' onClick={this.evEdit} disabled={this.state.isChanged}/>
            </td>
            <td className='Main'>
                <input type='button' value='Удалить' className='DelButton' onClick={this.evDelete} disabled={this.state.isChanged||this.state.isEdit}/>
        </td>
        </tr>
        )
    }
}

export default ProductRow

/*<NavLink to={"/product/"+this.state.code} className="PageLink" activeClassName="ActivePageLink">{this.state.row.name}</NavLink>*/