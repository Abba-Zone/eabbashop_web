import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props{
    menu:menu;
}

const MenuCard1:React.FC<Props> = (props) => {
    const navigate = useNavigate();
    return (
        <div className="sidebar-menu-category" onClick={() => {navigate(props.menu.url)}}>
            <div>
                {props.menu.icon}
            </div>
            <div>
                {props.menu.headerName}
            </div>
        </div>
    );
}
export default MenuCard1;
