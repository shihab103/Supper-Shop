import { Link, useNavigate } from "react-router";
import registerAnimation from "../../assets/Lotties/register.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import ShopLogo from "../../Layout/Shared/ShopLogo/ShopLogo";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const { name, email, password } = data;
    console.log("🚀 ~ handleRegister ~ name:", name);
    // console.log(name, email, password);

    createUser(email, password)
      .then((result) => {
        console.log("🚀 ~ handleRegister ~ result:", result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/account");
      })
      .catch((error) => {
        console.log("🚀 ~ handleRegister ~ error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <>
      {/* Main Register Page */}
      <div className="min-h-screen flex items-center justify-center bg">
        <div className="w-full  max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-base-100 shadow-xl rounded-2xl relative">
          {/* Left side (Form only) */}
          <div className="relative secondary pt-10 px-8">
            <ShopLogo />
            <h1 className="text-4xl font-bold mb-6 text-center">
              Register Now!
            </h1>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input bg input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input bg input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full bg"
                  required
                />
              </div>
              <button type="submit" className="btn primary text-white w-full">
                Register
              </button>
            </form>

            <p className="mt-4 mb-10 text-center">
              Already have an account?{" "}
            <Link className="text-[#669295] underline" to="/login">
                Login
              </Link>
            </p>
          </div>

          {/* Right side (Register animation) */}
          <div className="hidden bg-white md:block">
            <Lottie animationData={registerAnimation} loop={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
