import MenuCard1 from "./MenuCard1";
import MenuCard2 from "./MenuCard2";

const menuList:menu[] = [
    {icon: <>ㄷ</>, headerName: "대시보드", url:"/admin", items: []},
    {icon: <>ㄱ</>, headerName: "고객", url:"", items: [{name:"고객관리", url:"/admin/member"}, {name:"역할관리", url:"/admin/role"}]},
    {icon: <>ㅅ</>, headerName: "상품", url:"", items: [{name:"상품", url:"/"}, {name:"상품리뷰", url:"/"}, {name:"카타로그", url:"/"}]},
    {icon: <>ㅍ</>, headerName: "판매", url:"", items: [{name:"주문", url:"/"}, {name:"정기주문", url:"/"}, {name:"송장", url:"/"}, {name:"출하", url:"/"}]},
    {icon: <>ㅅ</>, headerName: "수당", url:"", items: [{name:"뭐가", url:"/"}, {name:"들어가야됨?", url:"/"}]},
    {icon: <>ㅇ</>, headerName: "요청", url:"", items: [{name:"요청", url:"/"}, {name:"어떤것들이", url:"/"}, {name:"있었지?", url:"/"}]},
    {icon: <>ㅁ</>, headerName: "매장관리", url:"", items: [{name:"협력사", url:"/"}, {name:"지점", url:"/"}, {name:"대리점", url:"/"}]},
    {icon: <>ㄱ</>, headerName: "게시판", url:"", items: [{name:"공지사항", url:"/"}, {name:"아빠의편지", url:"/"}]},
    {icon: <>ㅅ</>, headerName: "설정", url:"/admin/setting", items: []},
]
// key={`menu-item-${item.name}-${index}`} // 더 고유한 key 생성
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
        <div>
            {rendering()}
        </div>
    );
}

export default Menu;