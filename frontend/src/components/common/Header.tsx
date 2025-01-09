import { useLocation } from "react-router-dom";
import AdminHaeder from "./AdminHaeder";
import ShopHeader from "./ShopHeader";
import { useMenu } from '../../context/MenuContext';

const Header: React.FC = () => {
  const { menuVisible, toggleMenu } = useMenu();
  const pathname = useLocation();

  const rendering = (): JSX.Element[] => {
    const result = [];
    switch (pathname.pathname) {
      case "/login": case "/signup": case "/admin/login": case "/admin/signup": case "/admin/registadmin":
        result.push(<></>);
        return result;
      default:
        if (pathname.pathname.substring(0, 6) === "/admin")
          result.push(<AdminHaeder key={"admin"} toggleMenu={toggleMenu} menuVisible={menuVisible} />);
        else
          result.push(<ShopHeader key={"shop"} />);
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
  