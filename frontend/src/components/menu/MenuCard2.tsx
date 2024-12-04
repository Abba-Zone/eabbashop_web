import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
  menu: menu; // menu 타입도 정의 필요
}

const MenuCard2: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  // map을 사용하여 리팩토링
  const renderMenuItems = () => {
    return props.menu.items.map((item, index) => (
      <div 
        className="sidebar-menu-item"
        key={`menu-item-${item.name}-${index}`} // 더 고유한 key 생성
        onClick={() => navigate(item.url)}
      >
        {item.name}
      </div>
    ));
  };

  const openMenu = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div className="sidebar-menu-category" onClick={openMenu}>
          <div>{props.menu.icon}</div>
          <div>{props.menu.headerName}</div>
          <div>
          {visible ? "close icon" : "open icon"}
          </div>
      </div>
      {visible? renderMenuItems():<></>}
    </div>
  );
};

export default MenuCard2;