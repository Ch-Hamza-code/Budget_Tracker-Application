import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { ProfileDataType } from "../Profile.types";

interface ProfileInformationProps {
  profileData: ProfileDataType;
}

const ProfileInformation = ({ profileData }: ProfileInformationProps) => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center", padding: 2 }}>
            <Avatar sx={{ width: 100, height: 100, margin: "0 auto" }} />
            <Typography variant="body2">Email: {profileData.email}</Typography>
          </Card>
        </Grid>

        <Grid item xs={24} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                About Me
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography></Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Personal Details
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>First Name:</strong> {profileData.firstname},{profileData.lastname}{" "}
              </Typography>
              <Typography variant="body2">
                <strong>Gender:</strong> {profileData.gender}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {profileData.email}
              </Typography>
              <Typography variant="body2">
                <strong>Education:</strong> {profileData.education}
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong> {profileData.streetAddress}, {profileData.city}, {profileData.state},{" "}
                {profileData.zipCode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Phone:</strong> {profileData.phoneNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Zip Code:</strong> {profileData.zipCode}
              </Typography>
              <Typography variant="body2">
                <strong>Date of Birth:</strong> {profileData.dob}
              </Typography>
              <Typography variant="body2"></Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileInformation;
