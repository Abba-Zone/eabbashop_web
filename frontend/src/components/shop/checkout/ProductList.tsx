interface buyProduct{
  productID : string, 
  name : string, 
  realPrice : number, 
  SP : number, 
  AW : number, 
  AK : number, 
  cnt: number
}
interface Props{
  productList:buyProduct[],
}
const ProductList:React.FC<Props> = ({productList}) => {
  const products = [ {productName:"Change Sample Product3" , cnt: 2}, {productName:"Change Sample Product2", cnt : 1}];
  const rendering = (): JSX.Element[] => {
    const result:JSX.Element[] = [];
    for(let i = 0 ; i < products.length; i++){
      result.push(
        <tr key={i}>
          <td>
            {products[i].productName}
          </td>
          <td>
          {products[i].cnt}개
          </td>
        </tr>
      )
    }
    return result;
}
  return (
    <div>
      <h2>구매 상품정보</h2>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {rendering()}
        </tbody>
      </table>
    </div>
  );
}
  
export default ProductList;