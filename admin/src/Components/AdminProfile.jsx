function AdminProfile() {
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

              {/* Profile Image */}
              <img
                src="https://via.placeholder.com/150"
                alt="Admin"
                className="rounded-circle shadow mb-3"
                width="130"
                height="130"
              />

              {/* Name */}
              <h4 className="fw-bold mb-1">Saad Khan</h4>

              {/* Employee Post */}
              <p className="text-muted mb-3">Senior Administrator</p>

              <hr />

              {/* Information Section */}
              <div className="text-start mt-3">

                <p className="mb-2">
                  <strong>Email:</strong> saad@gmail.com
                </p>

                <p className="mb-2">
                  <strong>Address:</strong> Street 12, Main Boulevard
                </p>

                <p className="mb-2">
                  <strong>City:</strong> Rawalpindi
                </p>

                <p className="mb-2">
                  <strong>Country:</strong> Pakistan
                </p>

                {/* ✅ Added Employee Experience */}
                <p className="mb-0">
                  <strong>Experience:</strong> 5 Years
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