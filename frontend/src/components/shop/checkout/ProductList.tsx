interface Props{
  productList:cartInfo[],
}
const ProductList:React.FC<Props> = ({productList}) => {
  const rendering = (): JSX.Element[] => {
    const result:JSX.Element[] = [];
    for(let i = 0 ; i < productList.length; i++){
      result.push(
        <tr key={i}>
          <td>
            {productList[i].name}
          </td>
          <td>
          {productList[i].quantity}개
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