import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify"; // ✅ added

/* ================= ZOD SCHEMA ================= */

const signinSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be 6 characters"),
});

function SignIn() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  /* ================= SUBMIT ================= */

  const onSubmit = async (formData) => {
    try {

      // ✅ convert object to FormData
      const sendData = new FormData();
      sendData.append("email", formData.email);
      sendData.append("password", formData.password);

      const res = await fetch(
        "http://localhost:7000/admin/sign-in",
        {
          method: "POST",
          body: sendData,
        }
      );

      const response = await res.json(); // ✅ fetch needs json()

      if (!res.ok) {
        throw new Error(response.message || "Login failed");
      }

      console.log("Login Success:", response);

      toast.success("Admin Login Successful ✅"); // ✅ toast success

    } catch (error) {
      console.error("Login Error:", error.message);

      toast.error(error.message || "Login Failed ❌"); // ✅ toast error
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Admin Sign In</h3>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  {...register("password")}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <button className="btn btn-primary w-100">
                Sign In
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignIn;