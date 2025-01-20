import ProductCard from "../product/ProductCard";
interface Props{
    products:shopProduct[],
}

const SearchProductList:React.FC<Props> = ({products}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < products.length; i++){
        result.push(<ProductCard key={i} product={products[i]} ></ProductCard>);
      }
      return result;
  }
    return (
      <div>
        {products==null || products.length === 0? <div>일치하는 상품이 없습니다.</div>: rendering()}
      </div>
    );
}
  
export default SearchProductList;