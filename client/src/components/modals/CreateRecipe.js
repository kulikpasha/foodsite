import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import {
	createRecipe,
	fetchBrands,
	fetchRecipes,
	fetchTypes,
} from "../../http/recipeAPI";
import { observer } from "mobx-react-lite";

const CreateRecipe = observer(({ show, onHide }) => {
	const { recipe } = useContext(Context);
	const [name, setName] = useState("");
	const [ingridients, setIngridients] = useState([]);
	const [file, setFile] = useState(null);
	const [instructions, setInstructions] = useState([]);

	useEffect(() => {
		fetchTypes().then((data) => recipe.setTypes(data));
		fetchBrands().then((data) => recipe.setBrands(data));
	}, []);

	const addinstructions = () => {
		setInstructions([
			...instructions,
			{ title: "", description: "", number: Date.now() },
		]);
	};
	const removeinstructions = (number) => {
		setInstructions(instructions.filter((i) => i.number !== number));
	};
	const changeinstructions = (key, value, number) => {
		setInstructions(
			instructions.map((i) =>
				i.number === number ? { ...i, [key]: value } : i
			)
		);
	};

	const addingridients = () => {
		setIngridients([
			...ingridients,
			{ name: "", amount: "", amount_type: "", number: Date.now() },
		]);
	};
	const removeingridients = (number) => {
		setIngridients(ingridients.filter((i) => i.number !== number));
	};
	const changeingridients = (key, value, number) => {
		setIngridients(
			ingridients.map((i) =>
				i.number === number ? { ...i, [key]: value } : i
			)
		);
	};

	const selectFile = (e) => {
		setFile(e.target.files[0]);
	};

	const addRecipe = () => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("img", file);
		formData.append("ingridients", JSON.stringify(ingridients));
		formData.append("brandId", recipe.selectedBrand.id);
		formData.append("typeId", recipe.selectedType.id);
		formData.append("instructions", JSON.stringify(instructions));
		createRecipe(formData).then((data) => onHide());
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Добавить рецепт
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>
							{recipe.selectedType.name || "Выберите тип"}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{recipe.types.map((type) => (
								<Dropdown.Item
									onClick={() => recipe.setSelectedType(type)}
									key={type.id}
								>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>
							{recipe.selectedBrand.name || "Выберите кухню"}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{recipe.brands.map((brand) => (
								<Dropdown.Item
									onClick={() =>
										recipe.setSelectedBrand(brand)
									}
									key={brand.id}
								>
									{brand.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-3"
						placeholder="Введите название рецепта"
					/>

					<Form.Control
						className="mt-3"
						type="file"
						onChange={selectFile}
					/>
					<hr />

					<Button variant={"outline-dark"} onClick={addingridients}>
						Добавить новый ингридиент
					</Button>
					{ingridients.map((i) => (
						<Row className="mt-4" key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={(e) =>
										changeingridients(
											"name",
											e.target.value,
											i.number
										)
									}
									placeholder="Введите название ингридиента"
								/>
							</Col>

							<Col md={4}>
								<Form.Control
									value={i.amount}
									onChange={(e) =>
										changeingridients(
											"amount",
											e.target.value,
											i.number
										)
									}
									placeholder="Введите количество"
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.amount_type}
									onChange={(e) =>
										changeingridients(
											"amount_type",
											e.target.value,
											i.number
										)
									}
									placeholder="Введите единицу измерения"
								/>
							</Col>
							<Col md={4}>
								<Button
									onClick={() => removeingridients(i.number)}
									variant={"outline-danger"}
								>
									Удалить
								</Button>
							</Col>
						</Row>
					))}
					<hr />
					<Button variant={"outline-dark"} onClick={addinstructions}>
						Добавить новый шаг
					</Button>
					{instructions.map((i) => (
						<Row className="mt-4" key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={(e) =>
										changeinstructions(
											"title",
											e.target.value,
											i.number
										)
									}
									placeholder="Введите название шага"
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={(e) =>
										changeinstructions(
											"description",
											e.target.value,
											i.number
										)
									}
									placeholder="Введите описание инструкции"
								/>
							</Col>
							<Col md={4}>
								<Button
									onClick={() => removeinstructions(i.number)}
									variant={"outline-danger"}
								>
									Удалить
								</Button>
							</Col>
						</Row>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>
					Закрыть
				</Button>
				<Button variant="outline-success" onClick={addRecipe}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateRecipe;
