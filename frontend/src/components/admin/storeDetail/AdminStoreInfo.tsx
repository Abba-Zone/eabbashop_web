interface Props{
    store:storeInfo,
}
const AdminStoreInfo:React.FC<Props> = ({store}) => {
    return (
        <div>
            <h3>{store.name}</h3>
            <div><div>점주</div><div>{store.host}</div></div>
            <div><div>전화번호</div><div>{store.phone}</div></div>
            <div><div>매장개업일</div><div>{store.createdDateTime}</div></div>
            <div><div>우편번호</div><div>{store.zipCode}</div></div>
            <div><div>기본주소</div><div>{store.baseAddress}</div></div>
            <div><div>상세주소</div><div>{store.detailAddress}</div></div>
        </div>
    );
}
  
export default AdminStoreInfo;