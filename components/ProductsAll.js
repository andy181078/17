import React from "react";
import PropTypes from 'prop-types';

import "./ProductsAll.css";
import {mobileEvents} from './events';
import isoFetch from 'isomorphic-fetch';
import ProductRow from "./ProductRow";
import ProductEdit from "./ProductEdit";
import {connect} from 'react-redux';
import { productsLoadingAC, productsErrorAC, productsSetAC } from "../redux/productsAC";
import { sortsPriceAC, sortsAmountAC } from "../redux/sortsAC";

class ProductsAll extends React.PureComponent{
    static propTypes={
        goods: PropTypes.array.isRequired,
        products: PropTypes.object.isRequired, 
        sorts: PropTypes.object.isRequired 
    }
    
    constructor(props) {
        super(props);
        // this.loadData();
        // не надо запускать асинхронные или долгие операции из конструктора
        // конструктор инициализирует только КЛАСС, это ещё не React-компонент
        // конструктор должен быть лёгким и быстрым
      }
       // this.saveData();
       

    state ={
        goods: this.props.goods,
        selectedProductCode: null,
        cardMode: 0,  // 0 - ничего не выводим, 1 - просмотр карточки товара, 2 - редактирование и создание товара
        isValid: true, 
        isChanged: false, 
        isAdd: false, 
        isEdit: false, 
        isDelete: false,
        dataReady: false,
        goods1: [],
        
    }

   

    componentDidMount =()=>{
        this.saveData();
        this.loadData();
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
    

    
   // result=result.filter(s=>s.text.includes(filter));
  // result=result.sort((a, b) => a.text.localeCompare(b.text)

  sortPrice=()=>{
    this.props.dispatch( sortsPriceAC(this.state.goods));
    //this.setState({
    //    goods: this.props.sorts           
   // })   
}

//result=result.sort((a, b) => a.quant.localeCompare(b.quant))

  sortAmount=()=>{
    this.props.dispatch( sortsAmountAC(this.state.goods));
  //  this.setState({
    //    goods: this.props.sorts           
//    })   
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
        let edit=this.state.goods;
        edit=edit.map(v=>(v.code==res.code)?res:v)    
        this.saveData();
        this.setState({
            goods: edit,
            isEdit: false, 
            cardMode: 0 
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

  
    
      loadData = () => {
        this.props.dispatch( productsLoadingAC() )  
        let sp1 = new URLSearchParams();
        sp1.append('f', 'READ');
        sp1.append('n', 'BIALOU14_TEST_INFO');
        
        isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
            method: 'POST',
            headers: {
                "Accept": "application/json", 
            },
            body: sp1
        })
        .then( response => { 
            if (!response.ok) 
                throw new Error("fetch error " + response.status); 
            else {
                return response.json(); 
            }
        })
        .then( data => { 
            this.props.dispatch( productsSetAC(data));  
        })
        .catch( (error) => {
            this.fetchError(error);
            this.props.dispatch( productsErrorAC());
        })
        
    
      };
    
      saveData = () => {
        let password=Math.random();
        let sp2 = new URLSearchParams();
                sp2.append('f', 'LOCKGET');
                sp2.append('n', 'BIALOU14_TEST_INFO');
                sp2.append('p', password);
               
                 
                isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                    },
                    body: sp2
                })
                  .then( (response) => { 
                        if (!response.ok) {
                            let Err=new Error("fetch error1 " + response.status);
                            Err.userMessage="Ошибка связи";
                            throw Err;
                        }
                        else   
                            return response.json();
                             
                    })
                    .then( (data) => {                  
                      this.lockGetReady(data,password,aaa)})
               
                    .catch( (error) => {
                      console.log('ошибка'); 
                        console.error(error);
                        
                    })
      }
                    lockGetReady = (callresult,password) => {
                     
                  console.log(callresult.result);
                     let agoods=[];
           
                if (callresult.result!==undefined) {
                agoods=this.props.goods ; }
    
                          let sp2 = new URLSearchParams();
                          sp2.append('f', 'UPDATE');
                          sp2.append('n', 'BIALOU12_TEST_INFO');
                          sp2.append("v", JSON.stringify(agoods));
                          sp2.append('p', password);
                          isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
                              method: 'POST',
                              headers: {
                                  "Accept": "application/json",
                              },
                              body: sp2,
                          })
                            .then( (response) => { // response - HTTP-ответ
                                  if (!response.ok) {
                                      let Err=new Error("fetch error " + response.status);
                                      Err.userMessage="Ошибка связи";
                                      throw Err;
                                  }
                                  else
                                      return response.json();
                              })
                              .catch( (error) => {
                                  console.error(error);
                              });
                      }
                    
    
      
    
    

    render(){
        if ( this.props.products.status<=1 )
        return "загрузка...";
    
      if ( this.props.products.status===2 )
        return "ошибка загрузки данных";
        
       
       
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
            <input type='button' value='Сортировка по цене' onClick={this.sortPrice} disabled={this.state.isChanged||this.state.isEdit}/> 
            <input type='button' value='Сортировка по количеству' onClick={this.sortAmount} disabled={this.state.isChanged||this.state.isEdit}/> 

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

const mapStateToProps = function (state) {
    return {
      products: state.products,
      sorts: state.sorts,
    };
  };
  
  export default connect(mapStateToProps)(ProductsAll);

    