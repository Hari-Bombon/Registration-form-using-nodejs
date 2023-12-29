import React, { useState, useRef } from "react";
import "../style/App.css";
import { MdMenu, MdExpandMore } from 'react-icons/md';
const menuItems = [
  {
    name: "Home",
    icon: "",
  },
  {
    name: "Settings",
    icon: "",
    items: ["Display", "Editor", "Theme", "Interface"],
  },
  {
    name: "Create",
    icon: "",
    items: ["Article", "Document", "Report"],
  },
  {
    name: "Account",
    icon: "",
    items: ["Dashboard", "Logout"],
  },
  {
    name: "Product",
    icon: "",
  },
  {
    name: "Favourites",
    icon: "favoruite",
  },
];

const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{}</span>
);

const CustomIcon = ({ icon }) => {
  const icons = {
    menu: <MdMenu />,
    expand_more: <MdExpandMore />,

  };

  return icons[icon] || null;
};

const NavHeader = () => (
  <header className="sidebar-header">
   
    <span>Admin</span>
  </header>
);

const NavButton = ({ onClick, name, icon, isActive, hasSubNav }) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {icon && <Icon icon={icon} />}
    <span>{name}</span>
    {hasSubNav && <Icon icon="expand_more" />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items = []) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <div
      className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items?.map((subItem) => (
          <NavButton
            key={subItem}
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <aside className="sidebar">
      <NavHeader />
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {!item.items && (
            <NavButton
              key={item.name}
              onClick={handleClick}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
            />
          )}
          {item.items && (
            <>
              <NavButton
                key={item.name}
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
              <SubMenu
                key={`${item.name}-submenu`}
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
              />
            </>
          )}
        </React.Fragment>
      ))}
    </aside>
  );
};

export default Sidebar;
