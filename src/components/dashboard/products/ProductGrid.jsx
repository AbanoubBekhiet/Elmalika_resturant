import React from "react";

const ProductGrid = ({ products }) => {
	return (
		<div className="py-6">
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-white shadow rounded-lg overflow-hidden"
					>
						{/* Product Image */}
						<div className="relative">
							<img
								src={product.imageUrl || "/assets/product.jpg"}
								alt={product.name}
								className="w-full h-40 object-cover"
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

							{/* Price */}
							<div className="flex items-center justify-between mt-2">
								<span className="text-yellow-500 font-bold">
									{product.price} ج.م
								</span>
								{product.oldPrice && (
									<span className="text-gray-400 line-through text-xs">
										{product.oldPrice} ج.م
									</span>
								)}
							</div>

							{/* Rating (always show 5 stars) */}
							<div className="flex">
								<div className="flex mt-1 mr-2">
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
								</div>
                <span>({product.ratingCount} عدد التقيمات)</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductGrid;
