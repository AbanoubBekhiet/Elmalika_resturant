import React from "react";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import HomeProducts from "../../components/HomeProducts/HomeProducts";
import MobileBanner from "./MobileBanner";
import Offer from "./Offer";
import { Helmet } from "react-helmet";
export default function Home() {
	return (
		<>
			<Helmet>
				<title>Queen Kitchen - مطبخ الملكة</title>
				<meta
					name="description"
					content="Browse our full menu — pizzas, burgers, desserts, and more. Order your favorite meal from Queen Kitchen. تصفّح قائمتنا الكاملة — بيتزا، برجر، حلويات والمزيد. اطلب وجبتك المفضّلة من مطبخ الملكة."
				/>
				<meta
					name="keywords"
					content="Queen Kitchen, food delivery, restaurant, desserts, meals ,مطبخ الملكة ,الملكة,مطعم الملكة,جاهز للأكل,الاكل ,عصائر,حلويات"
				/>

				<meta property="og:title" content="Queen Kitchen - مطبخ الملكة" />
				<meta
					property="og:description"
					content="Delicious food, desserts, and drinks delivered fresh from Queen Kitchen - مطبخ الملكة."
				/>

				<meta property="og:url" content="https://queen.kitchen/" />
				<meta property="og:type" content="website" />
			</Helmet>

			<HeroSection />
			<CategoriesSection />
			<HomeProducts />
			<MobileBanner />
			<Offer />
		</>
	);
}
