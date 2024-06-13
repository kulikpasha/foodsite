import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
	const { recipe } = useContext(Context);
	const pageCount = Math.ceil(recipe.totalCount / recipe.limit);
	const pages = [];

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1);
	}

	return (
		<Pagination className="mt-3">
			{pages.map((page) => (
				<Pagination.Item
					key={page}
					active={recipe.page === page}
					onClick={() => recipe.setPage(page)}
				>
					{page}
				</Pagination.Item>
			))}
		</Pagination>
	);
});

export default Pages;
