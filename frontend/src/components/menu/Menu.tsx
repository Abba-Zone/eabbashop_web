import MenuCard1 from "./MenuCard1";
import MenuCard2 from "./MenuCard2";

const menuList:menu[] = [
    {
        icon: <>ㄷ</>, 
        headerName: "대시보드", 
        url:"/admin", 
        items: []
    },
    {
        icon: <>ㄱ</>, 
        headerName: "고객", 
        url:"", 
        items: [
            {name:"회원 목록", url:"/admin/member"},
            {name:"회원 상세", url:"/admin/memberdetail"},
            {name:"입출금 내역", url:"/admin/memberdetail/wallet"}
        ]
    },
    {
        icon: <>ㅅ</>, 
        headerName: "상품", 
        url:"", 
        items: [
            {name:"상품 목록", url:"/admin/product"},
            {name:"상품 상세", url:"/admin/productdetail"},
            {name:"상품 리뷰", url:"/admin/productdetail/review"},
            {name:"상품 등록", url:"/admin/registproduct"},
            {name:"카탈로그", url:"/admin/catalogue"}
        ]
    },
    {
        icon: <>ㅍ</>, 
        headerName: "판매", 
        url:"", 
        items: [
            {name:"주문 목록", url:"/admin/order"},
            {name:"주문 상세", url:"/admin/orderdetail"},
            {name:"송장 목록", url:"/admin/invoice"},
            {name:"송장 상세", url:"/admin/invoicedetail"},
            {name:"출하 목록", url:"/admin/shipment"},
            {name:"출하 상세", url:"/admin/shipmentdetail"},
            {name:"정기주문 목록", url:"/admin/regularorder"},
            {name:"정기주문 상세", url:"/admin/regularorderdetail"}
        ]
    },
    {
        icon: <>ㅅ</>, 
        headerName: "수당", 
        url:"", 
        items: [
            {name:"수당 라인 목록", url:"/admin/share"},
            {name:"수당 라인 상세", url:"/admin/sharedetail"},
            {name:"수당 분배 내역", url:"/admin/sharemoney"},
            {name:"수당 분배 상세", url:"/admin/sharemoneydetail"}
        ]
    },
    {
        icon: <>ㅇ</>, 
        headerName: "요청", 
        url:"", 
        items: [
            {name:"이체 요청", url:"/admin/transfer"},
            {name:"결제 요청", url:"/admin/payment"},
            {name:"이체 취소", url:"/admin/transfercancel"},
            {name:"반품 요청", url:"/admin/takeback"},
            {name:"환불 요청", url:"/admin/refund"}
        ]
    },
    {
        icon: <>ㅁ</>, 
        headerName: "매장관리", 
        url:"", 
        items: [
            {name:"매장 목록", url:"/admin/store"},
            {name:"매장 상세", url:"/admin/storedetail"},
            {name:"매장 관리", url:"/admin/storemanage"}
        ]
    },
    {
        icon: <>ㄱ</>, 
        headerName: "게시판", 
        url:"", 
        items: [
            {name:"공지사항", url:"/admin/board/post"},
            {name:"아빠의편지", url:"/admin/board/letter"},
            {name:"기부내역", url:"/admin/board/donation"}
        ]
    },
    {
        icon: <>ㅅ</>, 
        headerName: "설정", 
        url:"/admin/setting", 
        items: []
    },
]

const Menu:React.FC = () => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < menuList.length ; i++ ){
            if (menuList[i].items.length === 0)
                result.push(<MenuCard1 key={`MenuCard-${menuList[i].headerName}-${i}`} menu={menuList[i]}/>);
            else
                result.push(<MenuCard2 key={`MenuCard-${menuList[i].headerName}-${i}`} menu={menuList[i]}/>);
        }
        return result;
    }
    return (
        <div className="admin-sidebar">
            {rendering()}
        </div>
    );
}

export default Menu;