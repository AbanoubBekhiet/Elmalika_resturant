// src/components/products/ProductGrid.jsx
import React, { useState } from "react";
import defaultFood from "./../../../assets/defaultFood.webp";
import UpdateProductForm from "./UpdateProductForm";

const ProductGrid = ({ products }) => {
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleUpdateClick = (product) => {
		setSelectedProduct(product);
	};

	const handleCloseForm = () => {
		setSelectedProduct(null);
	};

	const handleSaveChanges = (updatedProduct) => {
		console.log("Updated product:", updatedProduct);
		// Here you can send updatedProduct to your API with axios.put/post
		setSelectedProduct(null);
	};

	return (
		<div className="py-6">
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-white shadow rounded-lg overflow-hidden relative"
					>
						{/* Product Image */}
						<div className="relative">
							<img
								src={product.imageUrl || defaultFood}
								alt={product.name}
								loading="lazy"
								className="w-full h-40 object-cover"
								onError={(e) => (e.currentTarget.src = defaultFood)}
							/>
							{!product.isAvailable && (
								<span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
									SOLD OUT
								</span>
							)}
							{product.discount && (
								<span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
									{product.discount}
								</span>
							)}
						</div>

						{/* Product Info */}
						<div className="p-3">
							<h3 className="text-sm font-bold">{product.name}</h3>

							<div className="flex items-center justify-between mt-2">
								<span className="text-yellow-500 font-bold">
									{product?.sizes[0]?.price} ج.م
								</span>
							</div>

							{/* Rating */}
							<div className="flex items-center mt-1 text-xs">
								{Array.from({ length: 5 }).map((_, i) => (
									<svg
										key={i}
										className={`w-3 h-3 ${
											i < product.ratingAverage
												? "text-yellow-400"
												: "text-gray-300"
										}`}
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
									</svg>
								))}
								<span className="ml-2 text-gray-500">
									({product.ratingCount} تقييم)
								</span>
							</div>

							{/* Update Button */}
							<button
								className="mt-3 w-full bg-yellow-500 text-white py-1 rounded text-sm hover:bg-yellow-600"
								onClick={() => handleUpdateClick(product)}
							>
								تعديل المنتج
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Overlay Form */}
			{selectedProduct && (
				<UpdateProductForm
					product={selectedProduct}
					onClose={handleCloseForm}
					onSave={handleSaveChanges}
				/>
			)}
		</div>
	);
};

export default ProductGrid;
