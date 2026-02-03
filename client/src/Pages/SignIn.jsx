import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* Zod Schema */
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  cnic: z
    .string()
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC must be in 12345-1234567-1 format"),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("cnic", data.cnic); // ✅ Added CNIC

      const res = await fetch("http://localhost:7000/create/sign-up", {
        method: "POST", // 👈 MUST be POST
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Sign In</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register("email")} />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" {...register("password")} />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {/* CNIC */}
          <div className="mb-3">
            <label className="form-label">CNIC</label>
            <input type="text" className="form-control" {...register("cnic")} />
            {errors.cnic && (
              <small className="text-danger">{errors.cnic.message}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
