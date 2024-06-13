import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateRecipe from "../components/modals/CreateRecipe";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false);
	const [typeVisible, setTypeVisible] = useState(false);
	const [recipeVisible, setRecipeVisible] = useState(false);

	return (
		<Container className="d-flex flex-column">
			<Button
				variant={"outline-dark"}
				className="mt-4 p-2"
				onClick={() => setTypeVisible(true)}
			>
				Добавить тип
			</Button>
			<Button
				variant={"outline-dark"}
				className="mt-4 p-2"
				onClick={() => setBrandVisible(true)}
			>
				Добавить бренд
			</Button>
			<Button
				variant={"outline-dark"}
				className="mt-4 p-2"
				onClick={() => setRecipeVisible(true)}
			>
				Добавить рецепт
			</Button>
			<CreateBrand
				show={brandVisible}
				onHide={() => setBrandVisible(false)}
			/>
			<CreateRecipe
				show={recipeVisible}
				onHide={() => setRecipeVisible(false)}
			/>
			<CreateType
				show={typeVisible}
				onHide={() => setTypeVisible(false)}
			/>
		</Container>
	);
};

export default Admin;
