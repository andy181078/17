import React from "react";
import PropTypes from 'prop-types';

import "./ProductsAll.css";
import {mobileEvents} from './events';

import ProductRow from "./ProductRow";
import ProductEdit from "./ProductEdit";
import ProductCard from "./ProductCard";

class ProductsAll extends React.PureComponent{
    static propTypes={
        goods: PropTypes.array.isRequired,
    }

    state ={
        goods: this.props.goods,
        selectedProductCode: null,
        cardMode: 0,  // 0 - ничего не выводим, 1 - просмотр карточки товара, 2 - редактирование и создание товара
        isValid: true, 
        isChanged: false, 
        isAdd: false, 
        isEdit: false, 
        isDelete: false,
    }

   

    componentDidMount =()=>{
        mobileEvents.addListener('EvEdit',this.evEdit);
        mobileEvents.addListener('EvDelete',this.evDelete);
        mobileEvents.addListener('EvCardView',this.evCardView);
        mobileEvents.addListener('EvChanged',this.evChanged);
        mobileEvents.addListener('EvSave',this.evSave);
        mobileEvents.addListener('EvAdd',this.evAdd);
        mobileEvents.addListener('EvCancel',this.evCancel);

        
        
    }

    componentWillUnmount =()=>{
        mobileEvents.removeListener('EvEdit',this.evEdit);
        mobileEvents.removeListener('EvDelete',this.evDelete);
        mobileEvents.removeListener('EvCardView',this.evCardView);
        mobileEvents.removeListener('EvChanged',this.evChanged);
        mobileEvents.removeListener('EvSave',this.evSave);
        mobileEvents.removeListener('EvAdd',this.evAdd);
        mobileEvents.removeListener('EvCancel',this.evCancel);
    }
    

    


    evChanged=(bool)=>{
        this.setState({isChanged: bool})
    }

    evCardView =(code)=>{
        if (!this.state.isChanged){
            this.setState({
                cardMode: 1, 
                selectedProductCode: code, 
                isEdit: false,
                
            })
        }
    }

    evEdit=(code)=>{
        if (!this.state.isChanged){
            this.setState({
                cardMode: 2, 
                selectedProductCode: code,
                isEdit: true
            })
        }
    }

   
    add=()=>{
        if (!this.state.isChanged && !this.state.isEdit){
            let code=this.state.goods.length+1
            
            this.setState({
                selectedProductCode: code,
                cardMode: 2, 
                isAdd: true,
            })
        }
    }

    evSave=(res)=>{
        let edit=[...this.state.goods]
        edit=edit.map(v=>(v.code==res.code)?res:v)
        this.setState({
            cardMode: 0, 
            goods: edit,
            isEdit: false
        })
    }

    evAdd=(res)=>{
        this.state.goods.push(res)
        
       
        this.setState({
            cardMode: 0, 
            
        })
    }

    evDelete=(code)=>{
        if (!this.state.isChanged && !this.state.isEdit){
            if(confirm('Вы действительно хотите удалить товар?')){
                let res=[...this.state.goods];
                res=res.filter(v=>(v.code!==code));
                this.setState({
                    cardMode: 0,
                    goods: res
                   
                })
            } 
        }
    }

    evCancel=()=>{
        this.setState({ cardMode: 0,
                        isEdit: false})
    }

    render(){
        console.log("product allrender")

// ----------------------- ТАБЛИЦА ТОВАРОВ -----------------------//   
        var goodsRows=this.state.goods.map( v=>
            <ProductRow key={v.code} 
                        row={v} 
                        code={v.code} 
                        selectedProductCode={this.state.selectedProductCode}
                        isChanged={this.state.isChanged}
                        isEdit={this.state.isEdit}
                       
            />
        );

// СТРОКА ДЛЯ РАБОТЫ
let selectedRow=[...this.state.goods]
    selectedRow=selectedRow.find((v, i)=>v.code==this.state.selectedProductCode)

        return (
        <div>
            

            
            <table className='ProductsAll'>
                <tbody>
                
                
                    <tr> 
                        <th className='Main'>Наименование</th>
                        <th className='Main'>Цена</th>
                        <th className='Main'>URL</th>
                        <th className='Main'>Количество</th>
                        <th className='Main'>Исправить</th>
                        <th className='Main'>Удалить</th>
                    </tr>
                    
                    {goodsRows}
        
                </tbody>
            </table>
           
            <input type='button' value='Новый товар' onClick={this.add} disabled={this.state.isChanged||this.state.isEdit}/>

 

{/*----------------------- ПРОСМОТР КАРТОЧКИ -----------------------*/}            
            {/* 
                (this.state.cardMode=="1") &&
                <ProductCard row={selectedRow} 
                />
           */ } 

{/*----------------------- СОЗДАНИЕ И РЕДАКТИРОВАНИЕ -----------------------*/}
            {
                (this.state.cardMode=="2") &&
                <ProductEdit  
                            code={this.state.selectedProductCode} 
                            row={selectedRow} 
                            
                            
                            
                />
            }
        </div>
        )
    }
};

export default ProductsAll;
    