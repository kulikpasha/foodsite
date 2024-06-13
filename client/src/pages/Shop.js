import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import RecipeList from "../components/RecipeList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchRecipes, fetchTypes } from "../http/recipeAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
	const { recipe } = useContext(Context);

	useEffect(() => {
		fetchTypes().then((data) => recipe.setTypes(data));
		fetchBrands().then((data) => recipe.setBrands(data));
		fetchRecipes(null, null, 1, recipe.limit).then((data) => {
			recipe.setRecipes(data.rows);
			recipe.setTotalCount(data.count);
		});
	}, []);

	useEffect(() => {
		fetchRecipes(
			recipe.selectedType.id,
			recipe.selectedBrand.id,
			recipe.page,
			recipe.limit
		).then((data) => {
			recipe.setRecipes(data.rows);
			recipe.setTotalCount(data.count);
		});
	}, [recipe.page, recipe.selectedType, recipe.selectedBrand]);

	return (
		<Container>
			<Row className="mt-2">
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<RecipeList />
					<Pages />
				</Col>
			</Row>
		</Container>
	);
});

export default Shop;
