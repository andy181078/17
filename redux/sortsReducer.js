import { SORTS_PRICE, SORTS_AMOUNT } from './sortsAC';

const initState={

  
  goods: null,

}

function productsReducer(state=initState,action) {
  switch (action.type) {
    case SORTS_PRICE: {
      let res=action.sorts;
      res=res.sort((a, b) => a.price.localeCompare(b.price));   
      let newState={   
        goods:res
      }
      return newState;
     }

    case SORTS_AMOUNT: {
        let res=action.sorts;
        res=res.sort((a, b) => a.quant.localeCompare(b.quant));   
        let newState={   
          goods:res
        }
        return newState;
       }
  
    
    default:
      return state;
  }
}

export default productsReducer;
