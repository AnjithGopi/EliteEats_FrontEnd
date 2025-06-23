import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateLoginForm from "../../../utils/loginValidation";
import { login } from "../../../services/adminServices/login";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateLoginForm(email, password);

    if (validationError) {
      setErrormessage(validationError);
      return;
    }

    const response = await login({
      email: email,
      password: password,
    });

    if (response) {
      console.log(response);
      console.log("Admin login success");
      alert("success");
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-[#ffd700] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#cb202d]">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />

            {errormessage && (
              <p className="text-red-600 text-sm text-center">{errormessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#cb202d] font-bold text-white py-2 rounded-lg hover:bg-[#e53e3e] transition cursor-pointer "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
