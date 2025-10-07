// src/pages/DishOfTheDay.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import WeekMeal from "../../components/dashboard/weekMeal/WeekMeal";
import ReviewsSection from "../../components/dashboard/weekMeal/ReviewsSection";
import { UserContext } from "../../context/AuthContext";
import Loader from "../../loaders/Loader";

const API_BASE_URL = "https://api.queen.kitchen";

function DishOfTheDay() {
	const { accessToken } = useContext(UserContext);

	const [dish, setDish] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchDishAndReviews = async () => {
			try {
				setLoading(true);

				// 1. Fetch products for categoryId=3
				const resProducts = await axios.get(
					`${API_BASE_URL}/products?categoryId=3`,
					{
						withCredentials: true,
						headers: {
							"Content-Type": "application/json",
							...(accessToken && { Authorization: `Bearer ${accessToken}` }),
						},
					}
				);

				const products = resProducts.data;
				if (!products || !Array.isArray(products) || products.length === 0) {
					setDish(null);
					setReviews([]);
					return;
				}

				const firstDish = products[0];
				setDish(firstDish);

				// 2. Fetch reviews for the first product
				const resReviews = await axios.get(
					`${API_BASE_URL}/reviews/product/${firstDish.id}`,
					{
						withCredentials: true,
						headers: {
							"Content-Type": "application/json",
							...(accessToken && { Authorization: `Bearer ${accessToken}` }),
						},
					}
				);

				setReviews(resReviews.data?.items || []);
			} catch (err) {
				console.error("Error fetching dish or reviews:", err);
				setDish(null);
				setReviews([]);
			} finally {
				setLoading(false);
			}
		};

		fetchDishAndReviews();
	}, [accessToken]);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-10">
				<Loader />
			</div>
		);
	}
	return (
		<>
			{dish && <WeekMeal dish={dish} />}
			<ReviewsSection reviews={reviews} />
		</>
	);
}

export default DishOfTheDay;
