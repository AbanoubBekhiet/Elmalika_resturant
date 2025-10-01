// src/pages/auth/Signup.jsx
import React, { useEffect, useState, useContext } from "react";
import footerBG from "./../../assets/footerBG.jpg";
import queen from "./../../assets/queen.jpeg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/AuthContext";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    governorate: "",
    city: "",
    detailedAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, loading } = useContext(UserContext);

  const from = location.state?.from?.pathname || null;

  useEffect(() => {
    if (!loading && user) {
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (user.role === "ADMIN") {
          navigate("/dashboard", { replace: true });
        } else if (user.role === "USER") {
          navigate("/", { replace: true });
        }
      }
    }
  }, [user, loading, from, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const { firstName, lastName, email, password, phone, governorate, city } =
      formData;

    if (!firstName.trim()) {
      toast.error("يرجى إدخال الاسم الأول");
      return false;
    }

    if (!lastName.trim()) {
      toast.error("يرجى إدخال الاسم الأخير");
      return false;
    }

    if (!email.trim()) {
      toast.error("يرجى إدخال الإيميل");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("يرجى إدخال إيميل صحيح");
      return false;
    }

    if (!password.trim()) {
      toast.error("يرجى إدخال كلمة المرور");
      return false;
    }

    if (password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون على الأقل 6 أحرف");
      return false;
    }

    if (!phone.trim()) {
      toast.error("يرجى إدخال رقم الهاتف");
      return false;
    }

    if (!/^\d{10,11}$/.test(phone)) {
      toast.error("يرجى إدخال رقم هاتف صحيح");
      return false;
    }

    if (!governorate.trim()) {
      toast.error("يرجى إدخال المحافظة");
      return false;
    }

    if (!city.trim()) {
      toast.error("يرجى إدخال المدينة");
      return false;
    }

    return true;
  };

  const signup = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const signupData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        governorate: formData.governorate,
        city: formData.city,
        address: formData.detailedAddress,
      };

      const res = await axios.post(
        "https://api.queen.kitchen/auth/register",
        signupData,
        { withCredentials: true }
      );

      if (res.data && res.data.user) {
        setUser(res.data.user);
        toast.success("تم إنشاء الحساب بنجاح!");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("البيانات غير صحيحة أو الإيميل مستخدم بالفعل!");
      } else if (error.response?.status === 409) {
        toast.error("هذا الإيميل مسجل مسبقاً!");
      } else if (error.response?.status >= 500) {
        toast.error("خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.");
      } else if (error.code === "NETWORK_ERROR") {
        toast.error("لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "فشل إنشاء الحساب! يرجى المحاولة مرة أخرى."
        );
      }
      console.error(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signup();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          جاري التحقق من المصادقة...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-8"
      style={{
        backgroundImage: `url(${footerBG})`,
      }}
    >
      <div className="bg-white bg-opacity-95 shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img
            src={queen}
            alt="مطعم الملكة"
            className="w-20 h-20 object-contain"
          />
          <h2 className="text-xl font-semibold mt-2">إنشاء حساب جديد</h2>
          {location.state?.from && (
            <p className="text-sm text-yellow-600 mt-2 text-center">
              يجب إنشاء حساب للوصول إلى هذه الصفحة
            </p>
          )}
        </div>

        {/* Form */}
        <form
          className="mt-6 space-y-4 text-right"
          dir="rtl"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                الاسم الاول<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="محمد"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                الاسم الاخير<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="احمد"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              الإيميل<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="ma232424@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              الباسورد<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="********"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              رقم الهاتف<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select
                className="border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-100"
                disabled={isLoading}
              >
                <option value="+20">+20</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-r-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="123456789"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                المحافظة<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="governorate"
                value={formData.governorate}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="القاهرة"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                المدينة<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="مدينة نصر"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              العنوان بالتفاصيل
            </label>
            <input
              type="text"
              name="detailedAddress"
              value={formData.detailedAddress}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="الشارع والرقم والتفاصيل"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري إنشاء الحساب...
              </div>
            ) : (
              "إنشاء حساب جديد"
            )}
          </button>

          <p className="text-center text-sm mt-4">
            هل لديك حساب بالفعل؟{" "}
            <Link
              to="/login"
              state={{ from: location.state?.from }}
              className="text-yellow-500 hover:underline"
            >
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Signup;
