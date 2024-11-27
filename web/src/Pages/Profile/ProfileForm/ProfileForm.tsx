import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../../../Components/FormComponents/FormComponents";
import Button from "../../../Components/Buttons/Button";
import { ProfileFormStyled } from "./ProfileFormStyles";
import { ProfileFormProps } from "./ProfileForm.types";
import { profileFormSchema } from "../../../validations/validations";
import { ProfileDataType } from "../Profile.types";
import { UpdateAccount } from "../Profile.service";

const ProfileForm = ({ initialData }: ProfileFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileDataType>({
    defaultValues: initialData,
    resolver: yupResolver(profileFormSchema),
  });

  console.log(initialData);
  const handleUpdate = async (accountData: ProfileDataType) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated.");
        return;
      }

      await UpdateAccount(accountData, token);
      alert("Account updated successfully!");
    } catch (error: any) {
      console.error("Error updating account:", error.message);
      alert(error.message || "Failed to update account. Please try again.");
    }
  };

  return (
    <ProfileFormStyled>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            My Account
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <div className="Container">
            <div className="text-1">
              <InputField
                control={control}
                name="firstname"
                type="text"
                label="First Name"
                error={!!errors.firstname}
                placeholder="Enter first name"
                helperText={errors?.email?.message}
              />
              <InputField
                control={control}
                name="lastname"
                type="text"
                label="Last Name"
                error={!!errors.lastname}
                placeholder="Enter last name"
                helperText={errors?.lastname?.message}
              />
              <InputField
                control={control}
                name="email"
                type="text"
                label="Email"
                error={!!errors.email}
                placeholder="Enter an Email"
                helperText={errors?.email?.message}
              />
            </div>
            <div className="text-2">
              <InputField
                control={control}
                name="gender"
                type="text"
                label="Gender"
                error={!!errors.gender}
                placeholder="Gender"
                helperText={errors?.gender?.message}
              />
              <InputField
                control={control}
                name="jobTitle"
                type="text"
                label="Job Title"
                error={!!errors.jobTitle}
                placeholder="Enter your Job title"
                helperText={errors?.jobTitle?.message}
              />
            </div>
            <div className="text-3">
              <InputField
                control={control}
                name="streetAddress"
                type="text"
                label="Address"
                error={!!errors.streetAddress}
                placeholder="Address"
                helperText={errors?.streetAddress?.message}
              />
              <InputField
                control={control}
                name="city"
                type="text"
                label="City"
                error={!!errors.city}
                placeholder="Enter City"
                helperText={errors?.city?.message}
              />
            </div>
            <div className="text-4">
              <InputField
                control={control}
                name="state"
                type="text"
                label="State"
                error={!!errors.state}
                placeholder="Enter State"
                helperText={errors?.state?.message}
              />
              <InputField
                control={control}
                name="zipCode"
                type="text"
                label="Zip Code"
                error={!!errors.zipCode}
                placeholder="Enter ZipCode"
                helperText={errors?.zipCode?.message}
              />
            </div>
            <div className="text-5">
              <InputField
                control={control}
                name="phoneNumber"
                type="text"
                label="Phone Number"
                error={!!errors.phoneNumber}
                placeholder="Enter Phone Number"
                helperText={errors?.phoneNumber?.message}
              />
              <InputField
                control={control}
                name="dob"
                type="text"
                label="Date of Birth"
                error={!!errors.dob}
                placeholder="Enter dare of birth"
                helperText={errors?.dob?.message}
              />
            </div>
            <InputField
              control={control}
              name="education"
              type="text"
              label="Education"
              error={!!errors.education}
              placeholder="Enter Education"
              helperText={errors?.education?.message}
            />

            <Button variant="contained" color="primary" onClick={handleSubmit(handleUpdate)}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </ProfileFormStyled>
  );
};

export default ProfileForm;
