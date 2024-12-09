import { useTranslation } from "react-i18next";
import ListCard from "./ProductListCard";
interface Props{
    products:product[],
    changeSort(sortName:string):void,
}

const ProductList:React.FC<Props> = ({products, changeSort}) => {
  const { t } = useTranslation();
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
      <th onClick={()=>{changeSort('name')}}>{t("AdminProduct:List.Filter01")}</th>
      <th onClick={()=>{changeSort('seller')}}>{t("AdminProduct:List.Filter02")}</th>
      <th onClick={()=>{changeSort('stock')}}>{t("AdminProduct:List.Filter03")}</th>
      <th onClick={()=>{changeSort('activeYN')}}>{t("AdminProduct:List.Filter04")}</th>
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