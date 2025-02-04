import { useMemo, useState } from "react";

interface Props{
  productList:cartInfo[],
}
const Price:React.FC<Props> = ({productList}) => {
  const [SPPrice, setSPPrice] = useState<number>(0);
  const maxSP = useMemo(() => productList.reduce((sum, product) => sum + product.SP, 0), [productList]);
  const totalRealPrice = useMemo(() => productList.reduce((sum, product) => sum + product.realPrice, 0), [productList]);
  const checkKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^[\d.]$/.test(event.key) && event.key !== "Backspace") {
      event.preventDefault();
      return;
    }
    if (event.key === "." && event.currentTarget.value.includes(".")) {
      event.preventDefault();
    }
  };
  
  const changeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const point = Number(event.target.value);
    if (point <= maxSP)
      setSPPrice(point);
  }

  return (
    <div>
      <h2>가격</h2>
      <table>
        <tbody>
          <tr>
            <td>총가격</td>
            <td>${totalRealPrice}</td>
          </tr>
          <tr>
            <td>SP설정</td>
            <td>
              $<input type="number" value={SPPrice} onKeyDown={checkKey} onChange={changeMin} min={0} max={maxSP} step={0.1}/>
              <input
                type="range"
                min={0} max={maxSP} step={0.1}
                color="gray"
                value={SPPrice}
                onChange={(event) => {
                  setSPPrice(event.target.valueAsNumber);
                }}
              />
            </td>
            <td>최대 ${maxSP}까지</td>
          </tr>
          <tr>
            <td>실제 결제 포인트</td>
            <td>${(totalRealPrice - SPPrice).toFixed(1)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
  
export default Price;