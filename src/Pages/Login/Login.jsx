import { Link, useNavigate } from "react-router";
import loginAnimation from "../../assets/Lotties/Login.json";
import logoAnimation from "../../assets/Lotties/supper-shop-logo.json";
import Lottie from "lottie-react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";
import useAuth from "../../Hooks/useAuth";

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
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-8">
          {/* Logo + Title */}
          <Link
            to="/"
            className="fixed top-4 left-6 flex items-center space-x-3 select-none z-50"
          >
            <div className="w-14 h-14">
              <Lottie animationData={logoAnimation} loop={true} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold flex items-center space-x-1">
              <span className="text-orange-500">
                <Typewriter
                  words={["Supper"]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
              <span>&nbsp;</span>
              <span className="text-purple-600">
                <Typewriter
                  words={["Shop"]}
                  loop={1}
                  cursor={false}
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={2500}
                />
              </span>
            </h2>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-6">Login now!</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-sm text-right">
              <a href="#" className="link link-hover">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn btn-neutral w-full">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
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
