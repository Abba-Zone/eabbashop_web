import ListCard from "./ProductListCard";
interface Props{
    products:product[],
    changeSort(sortName:string):void,
}

const ProductList:React.FC<Props> = ({products, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < products.length; i++){
        result.push(<ListCard key={i} product={products[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>상품명</th>
      <th onClick={()=>{changeSort('seller')}}>판매자</th>
      <th onClick={()=>{changeSort('stock')}}>재고</th>
      <th onClick={()=>{changeSort('activeYN')}}>활성화</th>
    </tr>;
    return result;
  }
    return (
      <div>
        <table>
          <thead>
            {makeheader()}
          </thead>
          <tbody>
            {products==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default ProductList;