import React from 'react';

import ProductCard from '../components/ProductCard';

import goodsArr from "../goodsArr.json";

class Page_ProductCard extends React.PureComponent {
          
  render() {

    // раз написано <Route path="/client/:clid" component={Page_Client} />
    // значит Page_Client получит то что в УРЛе после /client/ под именем props.match.params.clid в виде строки
    let productCode=parseInt(this.props.match.params.clid);

    let productData=goodsArr.find( c => c.code==productCode );

    return (
      <ProductCard
      row={productData}
      />
    );
    
  }

}
    
export default Page_ProductCard;


/*let clientId=parseInt(this.props.match.params.clid);

let clientData=appData.clientsArr.find( c => c.id==clientId );

return (
  <MobileClientInfo
    info={clientData}
  />
);

} */
