import { Link, useNavigate } from "react-router";
import loginAnimation from "../../assets/Lotties/Login.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import ShopLogo from "../../Layout/Shared/ShopLogo/ShopLogo";

const Login = () => {
  const {signIn} = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const { email, password } = data;

    // sign in user
    signIn(email, password)
      .then((userCredential) => {
        navigate('/');
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${userCredential.user?.email || "User"}!`,
        });
        form.reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-6xl secondary shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-8">
          {/* Logo + Title */}
          <ShopLogo/>
          <h1 className="text-4xl font-bold text-center mb-6">Login now!</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input bg input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input bg input-bordered w-full"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-sm text-right">
              <a href="#" className="link link-hover">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn primary text-white w-full">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#669295] underline">
              Register here
            </Link>
          </p>
        </div>

        {/* Right: Lottie Animation */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4">
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
