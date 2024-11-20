import { useNavigate } from "react-router-dom";

interface Props{
    menu:menu;
  }
const MenuCard1:React.FC<Props> = (props) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => {navigate(props.menu.url)}}>
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
