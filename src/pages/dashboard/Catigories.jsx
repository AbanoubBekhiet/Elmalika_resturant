import React, { useState } from "react";
import FoodGrid from "../../components/dashboard/categories/FoodGrid";
import PageHeader from "../../components/sharedComponents/PageHeader";
import CenteredForm from "../../components/CenteredForm";

const tabs = [
	{ id: "all", label: "كل التصنيفات", count: 3 },
	{ id: "completed", label: "المضاف حديثا", count: 1 },
	{ id: "processing", label: "الاكثر طلبا ", count: 2 },
];

function Categories() {
	const [showForm, setShowForm] = useState(false);
	const [categories, setCategories] = useState([]);
	const [formHeader, setFormHeader] = useState("إضافة تصنيف");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [searchTerm, setSearchTerm] = useState(""); // 

	return (
		<>
			<PageHeader
				tabs={tabs}
				buttonText="إضافة تصنيف"
				inputPlaceholder="البحث باسم التصنيف"
				setShowForm={() => {
					setFormHeader("إضافة تصنيف");
					setSelectedCategory(null);
					setShowForm(true);
				}}
				searchTerm={searchTerm} // ✅ pass down
				setSearchTerm={setSearchTerm}
			/>
			<FoodGrid
				categories={categories}
				setCategories={setCategories}
				setShowForm={setShowForm}
				setFormHeader={setFormHeader}
				setSelectedCategory={setSelectedCategory}
				searchTerm={searchTerm} // ✅ pass down
			/>

			{showForm && (
				<CenteredForm
					onClose={() => setShowForm(false)}
					setCategories={setCategories}
					categories={categories}
					formHeader={formHeader}
					setFormHeader={setFormHeader}
					selectedCategory={selectedCategory}
				/>
			)}
		</>
	);
}

export default Categories;
