import React from "react";
import defaultFood from "./../../../assets/defaultFood.webp";

function FoodCard({
	id,
	name,
	imageUrl,
	createdAt,
	setShowForm,
	setFormHeader,
	setSelectedCategory,
}) {
	const dateObj = new Date(createdAt);
	const formattedDate = dateObj.toLocaleDateString("en-GB");

	function handleUpdate() {
		setFormHeader("تعديل تصنيف");
		setSelectedCategory({ id, name, imageUrl }); // send data to form
		setShowForm(true);
	}

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			{/* Image */}
			<img
				src={imageUrl || defaultFood}
				alt={name}
				loading="lazy"
				className="w-full h-40 object-cover"
			/>

			{/* Content */}
			<div className="p-4">
				<h3 className="text-md font-bold text-gray-800">{name}</h3>

				<div className="flex justify-between text-xs text-gray-500 my-3">
					<span>تاريخ الاضافة: {formattedDate}</span>
				</div>

				{/* Edit Button */}
				<button
					onClick={handleUpdate}
					className="w-full bg-yellow-400 text-white py-2 rounded-md font-medium"
				>
					تعديل
				</button>
			</div>
		</div>
	);
}

export default FoodCard;
