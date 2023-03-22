import React, { useState, useEffect } from "react";
import PersonalProfile from "./PersonalProfile";

import { useDispatch } from "react-redux";
import { useProfileDetails, getProfileDetails } from "./profileSlice";
import { MoonLoader } from 'react-spinners';

const Profile = () => {
  const profileDetails = useProfileDetails();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      await dispatch(getProfileDetails()).unwrap();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="wrapper min-h-full flex flex-col">
      <div className="space-y-8 h-full">
        {/* <!-- advisement --> */}
        {/* <!-- profile 1 --> */}
        {loading ? <MoonLoader
          cssOverride={{ margin: "100px auto" }}
          color={"#20c0E8"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
          :
          <>
            <PersonalProfile details={profileDetails} getProfile={getProfile} />
            {/* <Advertisement /> */}

          
            
          </>
        }
      </div>
    </div>
  );
};

export default Profile;
