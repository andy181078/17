const SORTS_PRICE='SORTS_PRICE';
const SORTS_AMOUNT='SORTS_AMOUNT';




const sortsPriceAC=function(sorts) {
  return {
    type: SORTS_PRICE,
    sorts:sorts,
  };
}

const sortsAmountAC=function(sorts) {
  return {
    type: SORTS_AMOUNT,
    sorts:sorts,
  };
}

export {
  sortsPriceAC,SORTS_PRICE,
  sortsAmountAC,SORTS_AMOUNT,
  
}
