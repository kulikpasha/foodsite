import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
	const { recipe } = useContext(Context);
	return (
		<ListGroup>
			{recipe.types.map((type) => (
				<ListGroup.Item
					style={{ cursor: "pointer" }}
					active={type.id === recipe.selectedType.id}
					onClick={() =>
						recipe.selectedType === type
							? recipe.setSelectedType({})
							: recipe.setSelectedType(type)
					}
					key={type.id}
				>
					{type.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	);
});

export default TypeBar;
