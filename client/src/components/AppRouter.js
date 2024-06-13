import React from "react";

import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
	//const iaAuth = false
	return (
		<Routes>
			{authRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} exact />
			))}
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} exact />
			))}
		</Routes>
	);
};
export default AppRouter;
