import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router";

/* Zod Schema */
const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  //cnic: z.string().regex(/^\d{5}-\d{7}-\d$/, "CNIC format: 12345-1234567-1"),
  post: z.string().min(2, "Employee post is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  phone: z.string().regex(/^03\d{9}$/, "Phone format: 03XXXXXXXXX"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.any().refine((file) => file?.length === 1, "Image is required"),
});

function SignUp() {
  const [preview, setPreview] = useState(null);

   const {user,error:userError,loading:userLoading} = useAuth();



  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });


   if(userLoading) return <p>Loading......</p>
   if(user && user?.name) return <Navigate to ={'/'}/>

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
     // formData.append("cnic", data.cnic);
      formData.append("post", data.post);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("phone", data.phone);
      formData.append("password", data.password);

      // image file
      formData.append("image", data.image[0]);

      const res = await fetch("http://localhost:7000/create/sign-up", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // Watch image input for preview
  const imageFile = watch("image");
  if (imageFile && imageFile.length > 0) {
    const file = imageFile[0];
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            {preview && (
              <div className="text-center p-3 bg-light">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}

            <div className="card-body p-4 p-md-5">
              <h3 className="text-center fw-bold mb-1">Employee Sign Up</h3>
              <p className="text-center text-muted mb-4">
                Create your account
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                enctype="multipart/form-data"
              >
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name")}
                  />
                  <div className="invalid-feedback">
                    {errors.name?.message}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email")}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                {/* Employee Post */}
                <div className="mb-3">
                  <label className="form-label">Employee Post</label>
                  <input
                    className={`form-control ${
                      errors.post ? "is-invalid" : ""
                    }`}
                    {...register("post")}
                  />
                  <div className="invalid-feedback">
                    {errors.post?.message}
                  </div>
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    rows="2"
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    {...register("address")}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.message}
                  </div>
                </div>

                {/* City */}
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    className={`form-control ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    {...register("city")}
                  />
                  <div className="invalid-feedback">
                    {errors.city?.message}
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    placeholder="03XXXXXXXXX"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    {...register("phone")}
                  />
                  <div className="invalid-feedback">
                    {errors.phone?.message}
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className={`form-control ${
                      errors.image ? "is-invalid" : ""
                    }`}
                    {...register("image")}
                  />
                  <div className="invalid-feedback">
                    {errors.image?.message}
                  </div>
                </div>

                <button className="btn btn-primary w-100 rounded-pill py-2 fw-semibold">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
