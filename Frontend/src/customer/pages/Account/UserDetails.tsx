import { Divider } from "@mui/material";
import ProfileFieldCard from "../../../component/ProfileFieldCard";

const UserDetails = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Personal Details</h1>
        </div>
        <div>
          <ProfileFieldCard keys="Name" value={"Yashu"} />
          <Divider />
          <ProfileFieldCard keys="Email" value={"yashu@gmail.com"} />
          <Divider />
          <ProfileFieldCard keys="Mobile" value={"8912340812"} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
