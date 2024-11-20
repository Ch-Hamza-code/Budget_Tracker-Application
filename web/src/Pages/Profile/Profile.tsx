import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid, Avatar, Divider, Button, TextField } from '@mui/material';
import { ProfileContainerStyled } from './Profile.Styles';
import Sidebar from '../../Components/SideBar/SideBar';

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');
  const [accountData, setAccountData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    budgetLimit: '',
    jobTitle: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    dob: '',
    education: '',
    gender: '',
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      if (activeTab === 'profile') {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
            },
          });
          setAccountData(response.data); // Set the user data
        } catch (error) {
          console.error('Error fetching account data:', error);
        }
      }
    };
  
    fetchAccountData();
  }, [activeTab]);
  
  

  const handleInputChange = (field: string, value: string) => {
    setAccountData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${accountData.email}`, accountData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      alert('Account updated successfully!');
      setAccountData(response.data); 
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account. Please try again.');
    }
  };
  

  return (
    <ProfileContainerStyled>
      <Sidebar />
      <div className='Main'>
        <div className="top">
          <Typography variant="h5" fontWeight="bold">Profile</Typography>
          <div>
            <Button onClick={() => setActiveTab('profile')} variant={activeTab === 'profile' ? 'outlined' : 'text'} color="primary">PROFILE</Button>
            <Button onClick={() => setActiveTab('account')} variant={activeTab === 'account' ? 'outlined' : 'text'} color="primary">MY ACCOUNT</Button>
          </div>
        </div>

        {activeTab === 'profile' && (
          <Box>
            <Grid container spacing={2} sx={{ marginBottom: 4 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', padding: 2 }}>
                  <Avatar sx={{ width: 100, height: 100, margin: '0 auto' }} />
                  <Typography variant="body2">Email: {accountData.email}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Budget Limit: {accountData.budgetLimit}
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={24} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">About Me</Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="body1" color="textSecondary"></Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">Personal Details</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2"><strong>First Name:</strong> {accountData.firstname} </Typography>
                    <Typography variant="body2"><strong>Gender:</strong> {accountData.gender}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {accountData.email}</Typography>
                    <Typography variant="body2"><strong>Education:</strong> {accountData.education}</Typography>
                    <Typography variant="body2"><strong>Address:</strong> {accountData.streetAddress}, {accountData.city}, {accountData.state}, {accountData.zipCode}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2"><strong>Phone:</strong> {accountData.phoneNumber}</Typography>
                    <Typography variant="body2"><strong>Zip Code:</strong> {accountData.zipCode}</Typography>
                    <Typography variant="body2"><strong>Date of Birth:</strong> {accountData.dob}</Typography>
                    <Typography variant="body2"><strong>Budget Limit:</strong> {accountData.budgetLimit}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )}

        {activeTab === 'account' && (
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">My Account</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="First Name" value={accountData.firstname} onChange={(e) => handleInputChange('firstname', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Last Name" value={accountData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Job Title" value={accountData.jobTitle} onChange={(e) => handleInputChange('jobTitle', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Street Address" value={accountData.streetAddress} onChange={(e) => handleInputChange('streetAddress', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="City" value={accountData.city} onChange={(e) => handleInputChange('city', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="State" value={accountData.state} onChange={(e) => handleInputChange('state', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Zip Code" value={accountData.zipCode} onChange={(e) => handleInputChange('zipCode', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Phone Number" value={accountData.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Date of Birth" value={accountData.dob} onChange={(e) => handleInputChange('dob', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Education" value={accountData.education} onChange={(e) => handleInputChange('education', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Gender" value={accountData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} />
                  </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
              </CardContent>
            </Card>
          </Box>
        )}
      </div>
    </ProfileContainerStyled>
  );
};

export default ProfileScreen;
