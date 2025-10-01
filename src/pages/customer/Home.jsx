import React from "react";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import HomeProducts from "../../components/HomeProducts/HomeProducts";
import MobileBanner from "./MobileBanner";
import Offer from "./Offer";

export default function Home() {
	return (
		<>
			<HeroSection />
			<CategoriesSection />
			<HomeProducts />
			<MobileBanner />
			<Offer />
		</>
	);
}
