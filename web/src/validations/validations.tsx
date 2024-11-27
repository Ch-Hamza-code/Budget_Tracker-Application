import * as yup from "yup";

export const profileFormSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required"),
  jobTitle: yup.string().required("Job Title is required"),
  streetAddress: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("Zip Code is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  dob: yup.string().required("Date of Birth is required"),
  education: yup.string().required("Education is required"),
  gender: yup.string().required("Gender is required"),
});

export const LoginFormSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
});

export const signUpFormSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  budgetLimit: yup.number().required("Budget Limit is required"),
});
