// src/components/dashboard/reviews/ReviewsSection.jsx
import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import fallbackImage from "./../../../assets/product.jpg";

const ReviewsSection = ({ reviews = [], loading = false }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		if (reviews.length === 0) return;
		setCurrentSlide((prev) => (prev + 1) % reviews.length);
	};

	const prevSlide = () => {
		if (reviews.length === 0) return;
		setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
	};

	const StarRating = ({ rating, size = "text-sm" }) => (
		<div className="flex justify-center mb-2">
			{[...Array(5)].map((_, index) => (
				<span
					key={index}
					className={`${size} mx-0.5 ${
						index < rating ? "text-yellow-400" : "text-gray-300"
					}`}
				>
					★
				</span>
			))}
		</div>
	);

	// Get three reviews to display (prev, current, next)
	const getDisplayedReviews = () => {
		if (reviews.length === 0) return [];
		const prevIndex = (currentSlide - 1 + reviews.length) % reviews.length;
		const nextIndex = (currentSlide + 1) % reviews.length;

		return [
			{ ...reviews[prevIndex], position: "left" },
			{ ...reviews[currentSlide], position: "center" },
			{ ...reviews[nextIndex], position: "right" },
		];
	};

	const displayedReviews = getDisplayedReviews();

	return (
		<div className="max-w-5xl mx-auto mt-16 p-5 font-sans bg-white rounded-2xl" dir="rtl">
			{/* Section Title */}
			<div className="text-center mb-12">
				<h2 className="text-4xl font-bold text-gray-800 inline-block pb-3 border-b-4 border-yellow-400">
					تقييم العملاء
				</h2>
			</div>

			{loading ? (
				<p className="text-center text-gray-500">جاري تحميل التقييمات...</p>
			) : reviews.length === 0 ? (
				<p className="text-center text-gray-500">لا توجد تقييمات بعد</p>
			) : (
				<>
					{/* Reviews Display */}
					<div className="relative mb-8">
						{/* Navigation Buttons */}
						<button
							onClick={prevSlide}
							className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-8 z-10 bg-white hover:bg-gray-50 border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-colors duration-200"
						>
							<IoChevronForward className="w-6 h-6 text-gray-600" />
						</button>

						<button
							onClick={nextSlide}
							className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-8 z-10 bg-white hover:bg-gray-50 border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-colors duration-200"
						>
							<IoChevronBack className="w-6 h-6 text-gray-600" />
						</button>

						{/* Three Reviews Container */}
						<div className="flex items-end justify-center gap-6 px-16">
							{displayedReviews.map((review, index) => {
								const isCenter = review.position === "center";
								const cardSize = isCenter ? "w-80 h-64" : "w-64 h-48";
								const avatarSize = isCenter ? "w-16 h-16" : "w-12 h-12";
								const nameSize = isCenter
									? "text-sm font-bold"
									: "text-xs font-semibold";
								const roleSize = "text-xs";
								const commentSize = isCenter ? "text-sm" : "text-xs";
								const starSize = isCenter ? "text-base" : "text-sm";

								return (
									<div
										key={`${review.id}-${index}`}
										className={`bg-white border-2 rounded-2xl p-6 shadow-lg transition-all duration-300 flex flex-col ${cardSize} ${
											isCenter
												? "border-yellow-400 shadow-xl"
												: "border-gray-200"
										}`}
									>
										{/* Avatar and Name */}
										<div className="text-center mb-4">
											<img
												src={review.user?.avatar || fallbackImage}
												alt={review.user?.name || "مستخدم"}
												className={`${avatarSize} rounded-full mx-auto mb-3 object-cover`}
											/>
											<h4 className={`${nameSize} text-gray-800`}>
												{review.user?.name || "مجهول"}
											</h4>
											<p className={`text-gray-500 ${roleSize} mt-1`}>
												{review.user?.role || "عميل"}
											</p>
										</div>

										{/* Star Rating */}
										<StarRating rating={review.rating} size={starSize} />

										{/* Comment */}
										<div className="flex-1 flex items-center">
											<p
												className={`text-gray-600 leading-relaxed text-center ${commentSize}`}
											>
												{review.comment}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Carousel Indicators */}
					<div className="flex justify-center gap-3 mt-8">
						{reviews.map((_, index) => (
							<button
								key={index}
								className={`w-3 h-3 rounded-full transition-all duration-200 ${
									index === currentSlide
										? "bg-gray-800 w-8"
										: "bg-gray-300 hover:bg-gray-400"
								}`}
								onClick={() => setCurrentSlide(index)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default ReviewsSection;
