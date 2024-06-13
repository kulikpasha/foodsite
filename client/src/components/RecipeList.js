import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import RecipeItem from "./RecipeItem";
import { fetchBrands } from "../http/recipeAPI";

const RecipeList = observer(() => {
	const { recipe } = useContext(Context);
	const [brands, setBrands] = useState([]);

	// Функция для загрузки брендов
	const loadBrands = async () => {
		try {
			const data = await fetchBrands();
			setBrands(data);
		} catch (error) {
			console.error("Failed to fetch brands", error);
		}
	};

	// Вызов функции загрузки брендов при монтировании компонента
	useEffect(() => {
		loadBrands();
	}, []); // Пустой массив зависимостей, чтобы эффект выполнялся только при монтировании

	return (
		<Row className="d-flex">
			{recipe.recipes.map((recipe) => (
				// Передача списка брендов в RecipeItem
				<RecipeItem key={recipe.id} recipe={recipe} brands={brands} />
			))}
		</Row>
	);
});

export default RecipeList;
