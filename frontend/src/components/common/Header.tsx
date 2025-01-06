import { useLocation } from "react-router-dom";
import AdminHaeder from "./AdminHaeder";
import ShopHeader from "./ShopHeader";
const Header:React.FC = () => {
  const pathname = useLocation();
  const rendering = (): JSX.Element[] => {
    const result = [];
    switch (pathname.pathname) {
      case "/login": case "/signup": case "/admin/login": case "/admin/signup": case "/admin/registadmin":
        result.push(<></>);
        return result
      default:
        if(pathname.pathname.substring(0,6) === "/admin")
          result.push(<AdminHaeder key={"admin"}/>); //어드민 헤더
        else
          result.push(<ShopHeader key={"shop"}/>); //샵 헤더
    }
    return result;
  }
  return (
    <div>
      {rendering()}
    </div>
  );
  }
  
  export default Header;
  