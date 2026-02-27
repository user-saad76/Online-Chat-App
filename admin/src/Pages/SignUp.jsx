import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

/* ================= ZOD SCHEMA ================= */

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  post: z.string().min(2, "Post is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(5, "Address is required"),
  country: z.string().min(2, "Country is required"),
  jobExperience: z.string().min(1, "Job experience required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required"),
});

/* ================= COMPONENT ================= */

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  /* Image Preview */
  const imageFile = watch("image");

  /* ================= SUBMIT ================= */

  const onSubmit = async (data) => {
    try {
      // ✅ Using FormData
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("post", data.post);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("country", data.country);
      formData.append("jobExperience", data.jobExperience);
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

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ❌");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 col-md-6 mx-auto">
        <h3 className="text-center mb-4">Employee Sign Up</h3>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" {...register("name")} />
            <small className="text-danger">{errors.name?.message}</small>
          </div>

          {/* Post */}
          <div className="mb-3">
            <label className="form-label">Post</label>
            <input className="form-control" {...register("post")} />
            <small className="text-danger">{errors.post?.message}</small>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register("email")} />
            <small className="text-danger">{errors.email?.message}</small>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea className="form-control" {...register("address")} />
            <small className="text-danger">{errors.address?.message}</small>
          </div>

          {/* Country */}
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input className="form-control" {...register("country")} />
            <small className="text-danger">{errors.country?.message}</small>
          </div>

          {/* Job Experience */}
          <div className="mb-3">
            <label className="form-label">Job Experience</label>
            <input
              placeholder="e.g. 2 Years"
              className="form-control"
              {...register("jobExperience")}
            />
            <small className="text-danger">
              {errors.jobExperience?.message}
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
            <small className="text-danger">{errors.password?.message}</small>
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
            <small className="text-danger">{errors.image?.message}</small>
          </div>

          {/* Image Preview */}
          {imageFile?.[0] && (
            <div className="text-center mb-3">
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="preview"
                width="150"
                className="img-thumbnail"
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