import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import { fetchOneRecipe } from "../http/recipeAPI";

const RecipePage = () => {
	const [recipe, setRecipe] = useState({ instructions: [], ingridients: [] });
	const { id } = useParams();
	useEffect(() => {
		fetchOneRecipe(id).then((data) => setRecipe(data));
	}, []);

	return (
		<Container className="mt-3">
			<Row>
				<Col md={4}>
					<Image
						width={300}
						height={300}
						src={process.env.REACT_APP_API_URL + recipe.img}
					/>
				</Col>
				<Col md={4}>
					<Row className="d-flex flex-column align-items-center">
						<h2>{recipe.name}</h2>
						<div
							className="d-flex align-items-center justify-content-center"
							style={{
								background: `url(${bigStar}) no-repeat center center`,
								width: 240,
								height: 240,
								backgroundSize: "cover",
								fontSize: 64,
							}}
						>
							{recipe.rating}
						</div>
					</Row>
				</Col>
				<Col md={4}>
					<Card>
						<Button variant={"outline-dark"}>
							Добавить в "Избранное"
						</Button>
					</Card>
				</Col>
			</Row>
			<Row className="d-flex flex-column m-3">
				<h1>Ингридиенты</h1>
				{recipe.ingridients.map((ingridients, index) => (
					<Row
						key={ingridients.id}
						style={{
							background:
								index % 2 === 0 ? "lightgray" : "transparent",
							padding: 10,
						}}
					>
						{ingridients.name}: {ingridients.amount}{" "}
						{ingridients.amount_type}
					</Row>
				))}
			</Row>

			<Row className="d-flex flex-column m-3">
				<h1>Инструкции по приготовлению</h1>
				{recipe.instructions.map((instructions, index) => (
					<Row
						key={instructions.id}
						style={{
							background:
								index % 2 === 0 ? "lightgray" : "transparent",
							padding: 10,
						}}
					>
						{instructions.title}: {instructions.description}
					</Row>
				))}
			</Row>
		</Container>
	);
};

export default RecipePage;
