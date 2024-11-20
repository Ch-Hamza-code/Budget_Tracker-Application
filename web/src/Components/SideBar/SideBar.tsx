// Sidebar.tsx
import React from 'react';
import { List,  ListItem,  ListItemIcon, } from '@mui/material';
import { DrawerStyled } from './SideBar.styles';
import Button from '../Buttons/Button';
import { Icon } from '../../Icons/Icon';


const sideBarItems = [
  {
    icon: <Icon iconName='LogoutIcon'/>,
    name: "Profile",
    href: "/profile-screen" 
   },
  {
   icon: <Icon iconName='analyticsIcon'/>,
   name: "Analytics", 
   href: "/analytics"
  },
  {
    icon: <Icon iconName='ExpensesIcon'/>,
    name: "Expenses", 
    href: '/expense-table'
   },
   {
    icon: <Icon iconName='usersIcon'/>,
    name: "Users",
    href: "/user-page" 
   },
   {
    icon: <Icon iconName='LogoutIcon'/>,
    name: "Logout",
    href: "/logout" 
   },
]

const Sidebar: React.FC = () => (

  <DrawerStyled variant="permanent" anchor="left">
    <List>
      {sideBarItems?.map((item)=>{
        return (
          <ListItem>
            <ListItemIcon>{item?.icon}</ListItemIcon>
            <Button type="submit" variant="text" href={item?.href}> {item?.name} </Button>
          </ListItem>
        )
      })}
    </List>
  </DrawerStyled>
);

export default Sidebar;
