import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Icon } from "../../Icons/Icon";

const drawerWidth = 200;

const sideBarItems = [
  {
    icon: <Icon iconName="logoicon" />,
  },
  {
    icon: <Icon iconName="usersIcon" />,
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
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const currentPath = window.location.pathname;

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          top: 10,
          right: 1400,
          left: isDrawerOpen ? drawerWidth - 40 : 10,
          transition: theme.transitions.create("left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        variant="permanent"
        open={isDrawerOpen}
        sx={{
          width: isDrawerOpen ? drawerWidth : theme.spacing(7),
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? drawerWidth : theme.spacing(7),
            boxSizing: "border-box",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Divider />
        <List>
          {sideBarItems.map((item, index) => {
            const isActive = currentPath === item.href;
            return (
              <Tooltip key={index} title={!isDrawerOpen ? item.name : ""} placement="right">
                <ListItem
                  component="a"
                  href={item.href}
                  sx={{
                    justifyContent: isDrawerOpen ? "initial" : "center",
                    padding: theme.spacing(1),
                    color: "inherit",
                    backgroundColor: isActive ? "rgba(117, 57, 255, 1)" : "inherit",
                    borderRadius: theme.shape.borderRadius,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 1)",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isDrawerOpen && <ListItemText primary={item.name} sx={{ marginLeft: theme.spacing(2) }} />}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>

        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;
