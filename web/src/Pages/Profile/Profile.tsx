import React, { useState } from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import { ProfileContainerStyled } from "./Profile.Styles";
import Sidebar from "../../Components/SideBar/SideBar";
import { ProfileDataType } from "./Profile.types";
import ProfileInformation from "./ProfileInformation/ProfileInformation";
import ProfileForm from "./ProfileForm/ProfileForm";
import useSWR from "swr";
import { getProfile } from "./Profile.service";
import { FETCH_ACCOUNT, LOCAL_HOST } from "../../Constants/Urls";

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "account">("profile");

  const { data: accountData, isLoading } = useSWR<ProfileDataType>(`${LOCAL_HOST}${FETCH_ACCOUNT}`, getProfile);
  if (isLoading || !accountData) return <div></div>;

  return (
    <ProfileContainerStyled>
      <Sidebar />
      <div className="Main">
        <div className="top">
          <Typography variant="h5" fontWeight="bold">
            Profile
          </Typography>
          <div>
            <Button
              onClick={() => setActiveTab("profile")}
              variant={activeTab === "profile" ? "contained" : "text"}
              color="primary"
            >
              PROFILE
            </Button>
            <Button
              onClick={() => setActiveTab("account")}
              variant={activeTab === "account" ? "contained" : "text"}
              color="primary"
            >
              MY ACCOUNT
            </Button>
          </div>
        </div>

        {activeTab === "profile" && <ProfileInformation profileData={accountData} />}

        {activeTab === "account" && <ProfileForm initialData={accountData} />}
      </div>
    </ProfileContainerStyled>
  );
};

export default ProfileScreen;
