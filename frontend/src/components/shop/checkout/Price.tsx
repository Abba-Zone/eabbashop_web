import { useMemo, useState } from "react";

interface Props{
  productList:cartInfo[],
}

const Price:React.FC<Props> = ({productList}) => {
  const [SPPrice, setSPPrice] = useState<number>(0);
  const maxSP = useMemo(() => productList.reduce((sum, product) => sum + product.SP, 0), [productList]);
  const totalRealPrice = useMemo(() => productList.reduce((sum, product) => sum + product.realPrice, 0), [productList]);

  return (
    <div>
      <h2>가격</h2>
      <table>
        <tbody>
          <tr>
            <td>총 가격</td>
            <td>${totalRealPrice}</td>
          </tr>
          <tr>
            <td>SP가격</td>
            <td>${maxSP}</td>
          </tr>
          <tr>
            <td>결제 포인트</td>
            <td>${(totalRealPrice - SPPrice).toFixed(0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
  
export default Price;