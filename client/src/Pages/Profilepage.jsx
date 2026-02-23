import React from "react";
import { useAuth } from "../contexts/AuthProvider";

function Profilepage() {

    const {user,logout}= useAuth()
    console.log("user information data",user);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div className="row align-items-center">
          
          {/* Profile Image */}
          <div className="col-md-4 text-center">
            <img
              src= {user?.data?.image}
              alt="Profile"
              className="img-fluid rounded-circle border border-3 border-primary"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>

          {/* Profile Info */}
          <div className="col-md-8">
            <h3 className="mb-3">Profile Information</h3>
            <hr />

            <p><strong>Name:</strong>{user?.data?.name}</p>
            <p><strong>Email:</strong>{user?.data?.email}</p>
            <p><strong>Phone:</strong> {user?.data?.phone}</p>
           
            {/* <button className="btn btn-primary mt-3">
              Edit Profile
            </button> */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profilepage;