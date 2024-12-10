interface Props{
    product:invoiceProduct,
}
const AdminInvoiceProductInfo:React.FC<Props> = ({product}) => {
    const showAllowNation = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < product.allowNation.length; i++){
            result.push(<span key={i}> {product.allowNation[i]} </span>);
        }
        return result;
    }
    const showViewSite = (): JSX.Element => {
        if(product.viewSite === "M")
            return <div>모바일</div>;
        else if (product.viewSite === "W")
            return <div>웹</div>;
        else
            return <div>모바일/웹</div>;
    }
    return (
        <div>
            <h3>상품정보</h3>
            <img src={product.thumbnail}/>
            <div><div> 상품명 </div><div>{product.productName}</div></div>
            <div><div> 실제가격 </div><div>{product.realPrice}</div></div>
            <div><div> 세금제외가격 </div><div>{product.taxFreePrice}</div></div>
            <div><div> SP가격 </div><div>{product.SPPrice}</div></div>
            <div><div> 허용국가 </div><div>{showAllowNation()}</div></div>
            <div><div> 모바일/웹 </div><div>{showViewSite()}</div></div>
        </div>
    );
}

export default AdminInvoiceProductInfo;