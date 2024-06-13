import React from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { RECIPE_ROUTE } from "../utils/consts";

const RecipeItem = ({ recipe, brands }) => {
	const navigate = useNavigate();

	const brand = brands.find((brand) => brand.id === recipe.brandId);

	return (
		<Col
			md={3}
			className={"mt-3"}
			onClick={() => navigate(RECIPE_ROUTE + "/" + recipe.id)}
		>
			<Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
				<Image
					width={150}
					height={150}
					src={process.env.REACT_APP_API_URL + recipe.img}
				/>
				<div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
					<div>{brand ? brand.name : "Бренд не найден"}</div>{" "}
					{/* Здесь отображаем имя бренда */}
					<div className="d-flex align-items-center">
						<div>{recipe.rating}</div>
						<Image width={18} height={18} src={star} />
					</div>
				</div>
				<div>{recipe.name}</div>
			</Card>
		</Col>
	);
};

export default RecipeItem;
