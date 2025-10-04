import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodCard from "./FoodCard";
import Loader from "../../../loaders/Loader";

function FoodGrid({
	categories,
	setCategories,
	setShowForm,
	setFormHeader,
	setSelectedCategory,
	searchTerm,
}) {
	const [isLoading, setIsLoading] = useState(true); // Initialize isLoading as true

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true); // Set isLoading to true before fetching
			try {
				const res = await axios.get("https://api.queen.kitchen/categories", {
					withCredentials: true,
				});
				setCategories(res.data);
			} catch (error) {
				console.error(
					"Error fetching categories:",
					error.response?.data || error.message
				);
			} finally {
				setIsLoading(false); // Set isLoading to false after fetching, whether it was successful or not
			}
		};

		fetchCategories();
	}, [setCategories]);

	// Apply search filter
	const filteredCategories = categories.filter((cat) =>
		cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
			{filteredCategories.map((food, index) => (
				<FoodCard
					key={index}
					{...food}
					setCategories={setCategories}
					setShowForm={setShowForm}
					setFormHeader={setFormHeader}
					setSelectedCategory={setSelectedCategory}
				/>
			))}
		</div>
	);
}

export default FoodGrid;
