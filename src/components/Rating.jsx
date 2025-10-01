import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Loader from "../loaders/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.queen.kitchen/reviews/product/${productId}`
        );
        setReviews(res.data.items || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("فشل في تحميل التقييمات، حاول مرة أخرى");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // حساب المجموع والمتوسط
  const totalRatings = reviews.length;
  const average =
    totalRatings > 0
      ? reviews.reduce((a, r) => a + r.rating, 0) / totalRatings
      : 0;

  // حساب توزيع النجوم
  const starDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="m-8 bg-white p-6 rounded-2xl shadow-md" dir="rtl">
      <h2 className="text-xl font-bold mb-6 text-right">
        تقييمات المنتج وآراء العملاء
      </h2>

      {/* Rating Summary */}
      <div className="flex flex-col-reverse md:flex-row-reverse justify-between gap-8 items-center rounded-lg p-4 border border-dashed border-gray-200">
        {/* Left: Bars */}
        <div className="flex-1 space-y-2 w-full">
          {starDistribution.map((r) => (
            <div key={r.star} className="flex items-center">
              <span className="w-8 text-right">{r.count}</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded h-2">
                <div
                  className="bg-black h-2 rounded"
                  style={{
                    width: `${(r.count / totalRatings) * 100 || 0}%`,
                  }}
                />
              </div>
              <span className="flex items-center gap-1 text-sm">
                {r.star}.0 <AiFillStar className="text-yellow-500" />
              </span>
            </div>
          ))}
        </div>

        {/* Right: Average */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-500 text-xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <AiFillStar
                  key={i}
                  className={i < Math.round(average) ? "" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              أكثر من {totalRatings} تقييم
            </p>
          </div>

          <div className="w-20 h-20 flex items-center justify-center">
            <CircularProgressbar
              value={(average / 5) * 100}
              text={average.toFixed(1)}
              styles={buildStyles({
                textSize: "24px",
                pathTransitionDuration: 0.5,
                pathColor: "#e6b700",
                textColor: "#000",
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </div>
      </div>

      <h3 className="text-gray-800 font-medium mt-10 mb-6 text-right">
        آراء العملاء
      </h3>

      {/* Reviews List */}
      <div className="mt-4 space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-dashed border-gray-200 p-6 flex flex-col md:flex-row justify-between gap-4"
            >
              {/* Stars & Review Text */}
              <div className="flex flex-col text-right">
                <div className="flex text-yellow-500 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <AiFillStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <div className="text-sm text-gray-500">
                  <p>{new Date(review.createdAt).toLocaleDateString("ar-EG")}</p>
                  <p className="font-bold">{review.user?.name || "مستخدم مجهول"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">لا توجد تقييمات بعد</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
