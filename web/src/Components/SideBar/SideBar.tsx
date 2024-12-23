import React, { useState } from "react";
import { IconButton, List, ListItem, ListItemIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerStyled } from "./SideBar.styles";
import { Icon } from "../../Icons/Icon";
import Button from "../Buttons/Button";

const sideBarItems = [
  {
    icon: <Icon iconName="profileIcon" />,
    name: "Profile",
    href: "/profile-screen",
  },
  {
    icon: <Icon iconName="analyticsIcon" />,
    name: "Analytics",
    href: "/analytics",
  },
  {
    icon: <Icon iconName="ExpensesIcon" />,
    name: "Expenses",
    href: "/expense-table",
  },
  {
    icon: <Icon iconName="usersIcon" />,
    name: "Users",
    href: "/user-page",
  },
  {
    icon: <Icon iconName="LogoutIcon" />,
    name: "Logout",
    href: "/logout",
  },
];

const Sidebar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer} sx={{ position: "absolute", top: 16, left: 16 }}>
        <MenuIcon />
      </IconButton>

      <DrawerStyled open={isDrawerOpen} onClose={toggleDrawer} variant="temporary" anchor="left">
        <List>
          {sideBarItems.map((item, index) => (
            <ListItem key={index} onClick={toggleDrawer} disablePadding>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Button type="button" variant="text" href={item.href}>
                {item.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </DrawerStyled>
    </>
  );
};

export default Sidebar;
