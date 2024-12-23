export interface ProfileDataType {
  firstname: string;
  lastname: string;
  email: string;
  jobTitle: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  dob: string;
  education: string;
  gender: string;
}

type newType = Pick<ProfileDataType, "gender" | "dob">;
