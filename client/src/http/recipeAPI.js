import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
	const { data } = await $authHost.post("api/type", type);
	return data;
};

export const fetchTypes = async () => {
	const { data } = await $host.get("api/type");
	return data;
};

export const createBrand = async (brand) => {
	const { data } = await $authHost.post("api/brand", brand);
	return data;
};

export const fetchBrands = async () => {
	const { data } = await $host.get("api/brand");
	return data;
};

export const createRecipe = async (recipe) => {
	const { data } = await $authHost.post("api/recipe", recipe);
	return data;
};

export const fetchRecipes = async (typeId, brandId, page, limit = 5) => {
	const { data } = await $host.get("api/recipe", {
		params: {
			typeId,
			brandId,
			page,
			limit,
		},
	});
	return data;
};

export const fetchOneRecipe = async (id) => {
	const { data } = await $host.get("api/recipe/" + id);
	return data;
};
