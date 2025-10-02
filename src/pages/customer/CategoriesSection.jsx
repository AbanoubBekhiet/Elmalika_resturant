import React from "react";
import { Link } from "react-router-dom";

// صور افتراضية لو الـ imageUrl فاضي
import readyforeat from "../../assets/readyforeat.png";
import readyforcook from "../../assets/readyforcook.png";
import todayeat from "../../assets/todayeat.png";
import chefImg from "../../assets/chef.png";
const categories = [
	{
		id: 1,
		name: "جاهز للاكل",
		imageUrl: readyforeat,
		path: "ready-to-eat",
	},
	{
		id: 2,
		name: "جاهز للطبخ",
		imageUrl: readyforcook,
		path: "ready-to-cook",
	},
	{
		id: 3,
		name: "طبق اليوم",
		imageUrl: todayeat,
		path: "dish-of-the-day",
	},
];

export default function CategoriesSection() {
	return (
		<section dir="rtl" className="container mx-auto px-[50px]">
			{/* أعلى الصفحة */}
			<div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
				<div className="text-left lg:order-2">
					<h2 className="text-[#EE3A43] font-bold text-right text-xl mb-4">
						معلومات عن مطعمنا
					</h2>
					<h1 className="text-[48px] text-right font-extrabold leading-tight">
						،نقدم لكم تجربة الذوق الشرقي الأصيل <br />
						بأطباق محضّرة بعناية لتجمع بين <br />
						النكهة والتقاليد
					</h1>
				</div>
				<div className="text-right lg:order-2">
					<p className="text-gray-600 mb-6 text-right">
						يعكس كل طبق نقدمه روح المطبخ العربي الأصيل بالنكهات والتوابل الشرقية
						المميزة. نحن نحرص على تقديم أجود المكونات والطابع العصري، لكي نقدم
						لكم أطباقاً بلمسة مميزة وجودة لا تُضاهى.
					</p>
					<div className="flex items-center justify-start lg:justify-start">
						<div className="text-right">
							<p className="font-bold">شيف/ أحمد السيد</p>
							<p className="text-sm text-gray-500">
								المدير والرئيس التنفيذي للعمليات
							</p>
						</div>
						<img
							src={chefImg}
							alt="شيف أحمد السيد"
							className="w-12 h-12 rounded-full object-cover ml-3"
						/>
					</div>
				</div>
			</div>

			{/* شبكة الكروت */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center justify-items-center min-h-[300px]">
				{categories.map((cat, idx) => (
					<Link
						key={cat.id}
						to={`/${cat.path}`}
						className={`flex flex-col ${idx === 1 ? "lg:mt-16" : ""}`}
					>
						<div className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow hover:scale-105 transition-transform duration-300 overflow-hidden bg-white">
							<img
								src={cat.imageUrl}
								alt={cat.name}
								className="w-full h-auto object-cover"
								loading="lazy"
							/>
						</div>

						<h3 className="text-lg font-bold mt-3 text-center">{cat.name}</h3>
					</Link>
				))}
			</div>
		</section>
	);
}
