import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
	const { recipe } = useContext(Context);

	return (
		<Row className="d-flex">
			{recipe.brands.map((brand) => (
				<Card
					style={{ cursor: "pointer" }}
					key={brand.id}
					className="p-3"
					onClick={() =>
						recipe.selectedBrand === brand
							? recipe.setSelectedBrand({})
							: recipe.setSelectedBrand(brand)
					}
					border={
						brand.id === recipe.selectedBrand.id
							? "danger"
							: "light"
					}
				>
					{brand.name}
				</Card>
			))}
		</Row>
	);
});

export default BrandBar;
