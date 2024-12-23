import styled from "styled-components";
import { Drawer } from "@mui/material";

export const DrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    width: 240px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }

  .MuiList-root {
    margin-top: 16px;
  }

  .MuiListItemIcon-root {
    color: #673ab7;
  }

  .MuiButtonBase-root {
    text-transform: none;
    color: #333;
    font-weight: 500;
  }
`;
