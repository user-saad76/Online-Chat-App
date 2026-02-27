import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

/* ================= ZOD SCHEMA ================= */

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  post: z.string().min(2, "Employee post is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  phone: z.string().regex(/^03\d{9}$/, "Phone format: 03XXXXXXXXX"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required"),
});

/* ================= COMPONENT ================= */

function SignUp() {
  //const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  /* Redirect Logic */
//   if (loading) return <p>Loading...</p>;
//   if (user && user?.name) return <Navigate to="/" />;

  /* Image Preview (LIKE FIRST CODE ✅) */
  const imageFile = watch("image");

  /* Submit */
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("post", data.post);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("image", data.image[0]);

      const res = await fetch(
        "http://localhost:7000/create/admin/sign-up",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Signup failed ❌");
        return;
      }

      toast.success("Account created successfully 🎉");
      reset();

      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Employee Sign Up</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              {...register("name")}
            />
            <small className="text-danger">
              {errors.name?.message}
            </small>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email")}
            />
            <small className="text-danger">
              {errors.email?.message}
            </small>
          </div>

          {/* Post */}
          <div className="mb-3">
            <label className="form-label">Employee Post</label>
            <input
              className="form-control"
              {...register("post")}
            />
            <small className="text-danger">
              {errors.post?.message}
            </small>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              rows="2"
              className="form-control"
              {...register("address")}
            />
            <small className="text-danger">
              {errors.address?.message}
            </small>
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              className="form-control"
              {...register("city")}
            />
            <small className="text-danger">
              {errors.city?.message}
            </small>
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              placeholder="03XXXXXXXXX"
              className="form-control"
              {...register("phone")}
            />
            <small className="text-danger">
              {errors.phone?.message}
            </small>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password")}
            />
            <small className="text-danger">
              {errors.password?.message}
            </small>
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              {...register("image")}
            />
            <small className="text-danger">
              {errors.image?.message}
            </small>
          </div>

          {/* Image Preview */}
          {imageFile?.[0] && (
            <div className="mb-3 text-center">
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="preview"
                className="img-thumbnail"
                width="150"
              />
            </div>
          )}

          <button className="btn btn-primary w-100">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;