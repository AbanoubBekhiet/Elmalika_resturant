import React, { useState, useEffect } from "react";
import ProductGrid from "../../components/dashboard/products/ProductGrid";
import Pagination from "../../components/dashboard/OrdersTablePage/Pagination";
import ProductsHeader from "../../components/dashboard/products/ProductsHeader";
import axios from "axios";

const tabsTemplate = [
	{ id: "all", label: "كل المنتجات", count: 0 },
	{ id: 1, label: "جاهز للأكل", count: 0 },
	{ id: 2, label: "جاهز للطبخ", count: 0 },
	{ id: 3, label: "طبق اليوم", count: 0 },
];

function Products() {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeTab, setActiveTab] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [tabs, setTabs] = useState(tabsTemplate);
	const productsPerPage = 16;

	// Fetch all products from backend
	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = () => {
		axios
			.get("https://api.queen.kitchen/products", { withCredentials: true })
			.then((res) => {
				const data = Array.isArray(res.data) ? res.data : [];
				setProducts(data);
				setFilteredProducts(data);
				const newTabs = tabsTemplate.map((tab) => {
					if (tab.id === "all") return { ...tab, count: data.length };
					return {
						...tab,
						count: data.filter((p) => p.categoryId === tab.id).length,
					};
				});
				setTabs(newTabs);
			})
			.catch((err) => console.log(err));
	};

	// Filter products based on active tab & search term
	useEffect(() => {
		let tempProducts = [...products];

		if (activeTab !== "all") {
			tempProducts = tempProducts.filter((p) => p.categoryId === activeTab);
		}

		if (searchTerm.trim() !== "") {
			tempProducts = tempProducts.filter((p) =>
				p.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setFilteredProducts(tempProducts);
		setCurrentPage(1); // reset pagination
	}, [activeTab, searchTerm, products]);

	// Pagination calculations
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = Array.isArray(filteredProducts)
		? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
		: [];
	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	// Handle page change
	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll to top
	};

	return (
		<>
			<ProductsHeader
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<ProductGrid products={currentProducts} />
			<Pagination
				currentPage={currentPage}
				setCurrentPage={handlePageChange}
				totalPages={totalPages}
			/>
		</>
	);
}

export default Products;
