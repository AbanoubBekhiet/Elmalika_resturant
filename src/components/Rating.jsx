import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Loader from "../loaders/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/AuthContext";

const API_BASE_URL = "https://api.queen.kitchen";

const Reviews = ({ productId }) => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	// ✅ get access token from context
	const { accessToken, user } = useContext(UserContext);
	useEffect(() => {
		if (!productId) return;

		const fetchReviews = async () => {
			setLoading(true);
			try {
				const res = await axios.get(
					`${API_BASE_URL}/reviews/product/${productId}`
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

	const totalRatings = reviews.length;
	const average =
		totalRatings > 0
			? reviews.reduce((a, r) => a + r.rating, 0) / totalRatings
			: 0;

	const starDistribution = [5, 4, 3, 2, 1].map((star) => ({
		star,
		count: reviews.filter((r) => r.rating === star).length,
	}));

	function handleClickOnAddReviewButton() {
		if (!user) {
			toast.warning("يجب تسجيل الدخول اولا لإضافة تقييم");
			return;
		}
		setShowForm(true);
	}
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (rating === 0 || comment.trim() === "") {
			toast.warning("يرجى إدخال التقييم والتعليق أولاً");
			return;
		}

		try {
			const payload = {
				productId,
				rating,
				comment,
			};

			await axios.post(`${API_BASE_URL}/reviews`, payload, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					...(accessToken && { Authorization: `Bearer ${accessToken}` }),
				},
			});

			toast.success("تم إرسال تقييمك بنجاح!");

			setReviews((prev) => [
				...prev,
				{
					id: Date.now(),
					rating,
					comment,
					createdAt: new Date().toISOString(),
					user: { name: "أنت" },
				},
			]);

			setShowForm(false);
			setRating(0);
			setComment("");
		} catch (error) {
			console.error("Error submitting review:", error);
			toast.error("حدث خطأ أثناء إرسال التقييم، حاول مجددًا");
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center p-10">
				<Loader />
			</div>
		);
	}

	return (
		<div className="m-8 bg-white p-6 rounded-2xl shadow-md" dir="rtl">
			<div className="flex justify-between mb-5">
				<h2 className="text-xl font-bold mb-6 text-right">
					تقييمات المنتج وآراء العملاء
				</h2>
				<button
					onClick={handleClickOnAddReviewButton}
					className="py-1 px-3 text-white bg-yellow-500 rounded-2xl hover:bg-yellow-400 hover:text-black transition"
				>
					إضافة تقييم
				</button>
			</div>

			{/* Rating Summary */}
			<div className="flex flex-col-reverse md:flex-row-reverse justify-between gap-8 items-center rounded-lg p-4 border border-dashed border-gray-200">
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

			<div className="mt-4 space-y-6">
				{reviews.length > 0 ? (
					reviews.map((review) => (
						<div
							key={review.id}
							className="border-b border-dashed border-gray-200 p-6 flex flex-col md:flex-row justify-between gap-4"
						>
							<div className="flex flex-col text-right">
								<div className="flex text-yellow-500 mb-2">
									{Array.from({ length: review.rating }).map((_, i) => (
										<AiFillStar key={i} />
									))}
								</div>
								<p className="text-gray-700 mb-2">{review.comment}</p>
								<div className="text-sm text-gray-500">
									<p>
										{new Date(review.createdAt).toLocaleDateString("ar-EG")}
									</p>
									<p className="font-bold">
										{review.user?.name || "مستخدم مجهول"}
									</p>
								</div>
							</div>
						</div>
					))
				) : (
					<p className="text-gray-500 text-center">لا توجد تقييمات بعد</p>
				)}
			</div>

			{/* ✅ Modal for Adding Review */}
			{showForm && (
				<div className="fixed inset-0 bg-black/50 flex justify-center items-center  z-50">
					<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md animate-slide-up h-fit">
						<h3 className="text-lg font-bold mb-4 text-right">إضافة تقييم</h3>
						<form onSubmit={handleSubmit} className="space-y-4 text-right">
							<div>
								<label className="block mb-2 font-medium">التقييم:</label>
								<div className="flex flex-row-reverse justify-end gap-1 text-yellow-500 text-xl">
									{[1, 2, 3, 4, 5].map((star) => (
										<AiFillStar
											key={star}
                      size={40}
											className={`cursor-pointer  ${
												star <= rating ? "text-yellow-500" : "text-gray-300"
											}`}
											onClick={() => setRating(star)}
										/>
									))}
								</div>
							</div>

							<div>
								<label className="block mb-2 font-medium">تعليقك:</label>
								<textarea
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
									rows="4"
									placeholder="اكتب رأيك هنا..."
								/>
							</div>

							<div className="flex justify-between mt-4">
								<button
									type="button"
									onClick={() => setShowForm(false)}
									className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
								>
									إلغاء
								</button>
								<button
									type="submit"
									className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-400"
								>
									إرسال التقييم
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Reviews;
