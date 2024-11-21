import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  menu: menu; // menu 타입도 정의 필요
}

type style = {
  display: string;
}

const MenuCard2: React.FC<Props> = (props) => {
  const [style, setStyle] = useState<style>({ display: 'none' });
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  // map을 사용하여 리팩토링
  const renderMenuItems = () => {
    return props.menu.items.map((item, index) => (
      <div 
        key={`menu-item-${item.name}-${index}`} // 더 고유한 key 생성
        onClick={() => navigate(item.url)}
      >
        {item.name}
      </div>
    ));
  };

  const openMenu = () => {
    setStyle({ display: visible ? 'none' : 'block' });
    setVisible(!visible);
  };

  return (
    <div>
      <div onClick={openMenu}>
        <div>
          <div>{props.menu.icon}</div>
          <div>{props.menu.headerName}</div>
        </div>
        <div>
          {visible ? "close icon" : "open icon"}
        </div>
      </div>
      <div style={style}>
        {renderMenuItems()}
      </div>
    </div>
  );
};

export default MenuCard2;