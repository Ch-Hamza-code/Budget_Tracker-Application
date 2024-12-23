import { AnalyticsIcon } from "./AnalyticsIcon";
import { ExpensesIcon } from "./ExpensesIcon";
import { LogoutIcon } from "./LogoutIcon";
import { UsersIcon } from "./UsersIcon";

interface IconsProps {
  iconName: string;
}

export const Icon = ({ iconName }: IconsProps) => {
  const iconsMapper = {
    usersIcon: <UsersIcon />,
    analyticsIcon: <AnalyticsIcon />,
    ExpensesIcon: <ExpensesIcon />,
    LogoutIcon: <LogoutIcon />,
  };
  return <>{iconsMapper[iconName as keyof typeof iconsMapper]}</>;
};
