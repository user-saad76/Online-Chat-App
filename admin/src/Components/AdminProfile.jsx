import { useAuth } from "../contexts/AuthAdminProvider";

function AdminProfile() {
  const { admin } = useAuth();
  console.log("admin information", admin);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card shadow-lg border-0 rounded-4">

            {/* Top Banner */}
            <div className="bg-primary text-white text-center py-4 rounded-top-4">
              <h3 className="mb-0">Admin Profile</h3>
            </div>

            <div className="card-body text-center p-4">

              {/* ✅ Profile Image FIXED */}
              <img
                src={admin?.data?.image?.secure_url}
                alt="Admin"
                className="rounded-circle shadow mb-3"
                width="130"
                height="130"
              />

              {/* Name */}
              <h4 className="fw-bold mb-1">
                {admin?.data?.name}
              </h4>

              {/* Employee Post */}
              <p className="text-muted mb-3">
                {admin?.data?.post}
              </p>

              <hr />

              {/* Information Section */}
              <div className="text-start mt-3">

                <p className="mb-2">
                  <strong>Email:</strong> {admin?.data?.email}
                </p>

                <p className="mb-2">
                  <strong>Address:</strong> {admin?.data?.address}
                </p>

                <p className="mb-2">
                  <strong>Country:</strong> {admin?.data?.country}
                </p>

                <p className="mb-0">
                  <strong>Experience:</strong> {admin?.data?.jobExperience}
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminProfile;