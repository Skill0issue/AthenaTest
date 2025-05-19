import { useEffect, useState } from "react";
import { useUser } from "../utils/hooks/userUser"; 
import type { User } from "../utils/types";
import { handleFormSubmit } from "../utils/handleFormSubmit";
import { useNavigate } from "react-router-dom";


// Importing images
import img1 from "../assets/hr 1.avif";
import img2 from "../assets/hr 2.avif";
import img3 from "../assets/hr 3.avif";

const images = [img1, img2, img3];

const Login = () => {
  const [mess, setMess] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Using useNavigate to redirect after login
  const navigate = useNavigate();
  const { setUserName } = useUser() || {};
  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    const Log = localStorage.getItem("isLoggedin");

    if (user && Log) {
      navigate("/");
    }
  }, [navigate]);


  // Auto loop every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center h-4/5 w-4/5 border-1 border-blue">
        {/* Login Section */}
        <section className="w-full lg:w-1/2 h-full p-8 flex flex-col justify-center">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-blue-900">Login</h2>
            <p className="text-gray-500">Login to your account.</p>
          </div>
          <form
            onSubmit={(event) =>
              handleFormSubmit(event, (status: "success" | "error", user?: User) => {
                if (status === "success" && user) {
                  setUserName(user.firstName);
                  alert(`Welcome, ${user.firstName}!`);
                  localStorage.setItem("user", JSON.stringify(user));
                  navigate("/");
                } else {
                  console.error("Login failed");
                  setMess("Invalid email or password");
                }
              })
            }
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                E-mail Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {mess && <p className="text-red-500 text-sm">{mess}</p>}
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="text-blue-600">
                Reset Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900"
            >
              Sign In
            </button>
            <p className="text-sm text-center mt-2">
              Don’t have an account yet?{" "}
              <a href="#" className="text-blue-700 font-medium">
                Join KRIS today.
              </a>
            </p>
          </form>
        </section>

        {/* Image Section */}
        {/* Based on the client request i'm able to make this section hide or show! just need to add max-lg:display-none  */}
        <section className="relative w-full lg:w-1/2 h-[400px] lg:h-full overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`slide-${currentIndex}`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-blue-900 opacity-60" />
          <div className="absolute bottom-16 left-8 right-8 text-white z-10">
            <h2 className="text-xl lg:text-2xl font-semibold">
              Manage all{" "}
              <span className="text-yellow-400 font-bold">HR Operations</span>{" "}
              from the comfort of your home.
            </h2>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-8 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-yellow-400"
                    : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
