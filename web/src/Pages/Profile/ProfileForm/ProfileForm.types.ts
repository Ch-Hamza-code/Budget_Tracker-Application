import { ProfileDataType } from "../Profile.types";

export interface ProfileFormType extends ProfileDataType {}

export interface ProfileFormProps {
  initialData: ProfileDataType;
}
