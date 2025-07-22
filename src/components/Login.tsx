import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AlertCircle, CheckCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await signIn(email, password);

      if (error) {
        throw error;
      }

      // Redirect to home page after successful login
      navigate("/");
    } catch (err: any) {
      setError(
        err.message || "Failed to login. Please check your credentials.",
      );
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResetEmailSent(false);

    try {
      const { error } = await resetPassword(resetEmail);

      if (error) {
        throw error;
      }

      setResetEmailSent(true);
      // Keep the reset form open to show the success message
    } catch (err: any) {
      setError(
        err.message || "Failed to send password reset email. Please try again.",
      );
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleResetForm = () => {
    setShowResetForm(!showResetForm);
    setResetEmail(email); // Pre-fill with the email from login form if available
    setError("");
    setResetEmailSent(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-150">
        <div className="text-center">
          <img
            src="/discoveru-logo.svg"
            alt="DiscoverU Logo"
            className="h-16 w-auto mx-auto transform scale-150 mb-2"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder=""
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-xs text-gray-500 bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-0.5 rounded">
                    6+ characters
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={toggleResetForm}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </form>

        {showResetForm && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">
              Reset your password
            </h3>

            {resetEmailSent ? (
              <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-green-700">
                  Password reset email sent! Please check your inbox.
                </p>
              </div>
            ) : (
              <form className="mt-4 space-y-6" onSubmit={handlePasswordReset}>
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <Label
                    htmlFor="reset-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </Label>
                  <Input
                    id="reset-email"
                    name="reset-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={toggleResetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
