import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { StyledAppBar, StyledBox, StyledIconButton, StyledToolbar } from "./AppbarStyles";
import { Avatar, Typography } from "@mui/material";
import useSWR from "swr";
import { FETCH_ACCOUNT, LOCAL_HOST } from "../../Constants/Urls";
import { getProfile } from "../../Pages/Profile/Profile.service";
import { useNavigate } from "react-router-dom";

const MenuAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const { data: accountData, isLoading } = useSWR(`${LOCAL_HOST}${FETCH_ACCOUNT}`, getProfile);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNavigation = () => {
    handleClose();
    navigate("//profile-screen");
  };

  return (
    <StyledBox>
      <StyledAppBar>
        <StyledToolbar>
          <div>
            <StyledIconButton onClick={handleMenu}>
              <Avatar sx={{ width: 40, height: 40 }}>{accountData?.name?.charAt(0)}</Avatar>
            </StyledIconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {!isLoading && accountData && (
                <MenuItem disabled>
                  <Typography variant="body2" color="textSecondary">
                    {accountData.email}
                  </Typography>
                </MenuItem>
              )}

              <MenuItem onClick={handleProfileNavigation}>Profile</MenuItem>
            </Menu>
          </div>
        </StyledToolbar>
      </StyledAppBar>
    </StyledBox>
  );
};

export default MenuAppBar;
