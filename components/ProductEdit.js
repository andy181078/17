import React from "react";
import PropTypes from 'prop-types';
import {mobileEvents} from './events';

import "./ProductEdit.css";

class ProductEdit extends React.PureComponent{

    static propTypes={
        
        code: PropTypes.number.isRequired,
        row: PropTypes.object,
        
    }

    componentWillReceiveProps = (newProps) => {
        console.log("row id="+this.props.code+" componentWillReceiveProps");
        this.setState({row: newProps.row,
                       code: newProps.code
                       
                                         });
        
      };

    state={
        code: this.props.code,
        name: (this.props.row)?this.props.row.name:"",
        price: (this.props.row)?this.props.row.price:"",
        url: (this.props.row)?this.props.row.url:"",
        quant: (this.props.row)?this.props.row.quant:"",

        nameNotValid: false,    
        priceNotValid: false,
        urlNotValid: false,
        quantNotValid: false,

        nameErr: 'Пожалуйста, заполните поле. Значение должно быть строкой',
        priceErr: 'Пожалуйста, заполните поле. Значение должно быть рациональным числом больше 0',
        urlErr: 'Пожалуйста, заполните поле. Значение должно быть допустимым URL.',
        quantErr: 'Пожалуйста, заполните поле. Значение должно быть положительным целым числом.',

        notValidForm: false, 
        isAdd: (!this.props.row)?true:null
    }


   

    setPriceRef = null;

    PriceRef=(ref)=>{
        this.setPriceRef=ref
    }

    evChanged = (EO) => {
        this.setState({[EO.target.name]: EO.target.value
                 
            })
            mobileEvents.emit('EvChanged', true)
            
    }

    validate = (EO) =>{
// ----------------------- ВАЛИДАЦИЯ ВСЕХ ПОЛЕЙ ПРИ УХОДЕ С 1 ПОЛЯ-----------------------//
        if (this.state.name === ""){
            this.setState({nameNotValid: true}, this.validAll)
        } else{
            this.setState({nameNotValid: false}, this.validAll)
        }

        if ((this.state.price === "")|| (!(/^(0|[1-9]\d*)([.,]\d+)?/.test(Number(this.state.price))))){
            this.setState({priceNotValid: true}, this.validAll)
        } else{
            this.setState({priceNotValid: false}, this.validAll)
        }

        if (this.state.url === ""){
            this.setState({urlNotValid: true}, this.validAll)
        } else{
            this.setState({urlNotValid: false}, this.validAll)
        }

        if ((this.state.quant === "") || (!(/(?<![-.,])\b[0-9]+\b(?!\.[0-9])/.test(Number(this.state.quant))))){
            this.setState({quantNotValid: true}, this.validAll)
        } else{
            this.setState({quantNotValid: false}, this.validAll)
        }


    }

    validAll=()=>{
        if (this.state.nameNotValid||
            this.state.priceNotValid||
            this.state.urlNotValid||
            this.state.quantNotValid)
                {this.setState({notValidForm: true})
                mobileEvents.emit('EvChanged', true)
        } else {
                this.setState({notValidForm: false})
        }
    }

    evSave=()=>{
        mobileEvents.emit('EvSave', {
            ...this.props.row,  
            name: this.state.name,
            price: (this.setPriceRef)?this.setPriceRef.value:'',
            url: this.state.url,
            quant: this.state.quant,
        })
        
        mobileEvents.emit('EvChanged', false) 
    }

    evAdd=()=>{
        mobileEvents.emit('EvAdd', {
            code: this.props.code,
            name: this.state.name,
            price: (this.setPriceRef)?this.setPriceRef.value:'',
            url: this.state.url,
            quant: this.state.quant,
        }) 
    
       
        mobileEvents.emit('EvChanged', false)
    }

    evCancel=()=>{
        
        mobileEvents.emit('EvCancel', )
        mobileEvents.emit('EvChanged', false)
    }

    render(){
        console.log("edit and add render");
        return(
            <div className="ProductEdit">
                {
                    (this.state.isAdd)
                        ?<h2>Добавление нового продукта</h2>
                        :<h2>Исправление существующенго продукта</h2>
                }

                <label>ID{this.state.code}</label>
                <div>
                    <label>Наименование<input type="text"  value={this.state.name} name="name" onChange={this.evChanged} onBlur={this.validate} autoFocus={this.state.isAdd}/></label>
                    {(this.state.nameNotValid)&&<span className="Err">{this.state.nameErr}</span>} 
                </div>
                <div>
                    <label>Цена<input type="text" value={this.state.price} name="price" ref={this.PriceRef} onChange={this.evChanged} onBlur={this.validate}/></label>
                    {(this.state.priceNotValid)&&<span className="Err">{this.state.priceErr}</span>} 
                </div>
                <div>
                    <label>URL<input type="text" value={this.state.url} name="url" onChange={this.evChanged} onBlur={this.validate}/></label>
                    {(this.state.urlNotValid)&&<span className="Err">{this.state.urlErr}</span>} 
                </div>
                <div>
                    <label>Количество<input type="text" value={this.state.quant} name="quant" onChange={this.evChanged} onBlur={this.validate}/></label>
                    {(this.state.quantNotValid)&&<span className="Err">{this.state.quantErr}</span>} 
                </div>

                {
                    (this.state.isAdd)
                        ?<input type="button" value="Добавить" onClick={this.evAdd} disabled={this.state.notValidForm}/>
                        :<input type="button" value="Сохранить" onClick={this.evSave} disabled={this.state.notValidForm}/>
                }

                <input type="button" value="Сброс" onClick={this.evCancel}/>
            </div>
            
        )
    }
}
export default ProductEdit