import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

/* Zod Schema */
const signInSchema = z.object({
  name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

 

function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
  const res = await fetch("http://localhost:7000/sign-in", {
  method: "POST",
  credentials:"include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: data.name,
    email: data.email,
    password: data.password,
  }),
  

     });
      if (!res.ok) {
      alert(result.message || "You have given invalid information");
      return;
    }

    // success
    navigate("/");
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Sign In</h3>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" {...register("name")} />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

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

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
