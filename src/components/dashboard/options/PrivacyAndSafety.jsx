import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function PrivacyAndSafety() {
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("❌ الرجاء إدخال جميع الحقول");
      return false;
    }

    if (newPassword.length < 8) {
      toast.error("❌ كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("❌ تأكيد كلمة المرور غير مطابق");
      return false;
    }

    return true;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.patch(
        `https://api.queen.kitchen/users/me/password`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("✅ تم تحديث كلمة المرور بنجاح");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "❌ فشل التحديث، الرجاء المحاولة لاحقاً";
      toast.error(message);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm" dir="rtl">
      <h2 className="text-lg font-semibold mb-6">كلمة المرور</h2>

      <form onSubmit={handleUpdatePassword}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Old Password */}
          <div>
            <label className="block mb-2 text-sm text-gray-600">
              كلمة المرور القديمة
            </label>
            <div className="relative">
              <input
                type={showPassword.old ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => togglePassword("old")}
              >
                {showPassword.old ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-2 text-sm text-gray-600">
              كلمة المرور الجديدة
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => togglePassword("new")}
              >
                {showPassword.new ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block mb-2 text-sm text-gray-600">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => togglePassword("confirm")}
              >
                {showPassword.confirm ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-start gap-4">
          <button
            type="button"
            className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={() =>
              setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" })
            }
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            تحديث كلمة المرور
          </button>
        </div>
      </form>
    </div>
  );
}

export default PrivacyAndSafety;
