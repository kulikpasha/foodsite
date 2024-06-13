const uuid = require("uuid");
const path = require("path");
const { Recipe, Instruction, Ingridient } = require("../models/models");
const ApiError = require("../error/ApiError");

class RecipesController {
	async create(req, res, next) {
		try {
			let { name, typeId, brandId, instructions, ingridients } = req.body;
			const { img } = req.files;
			let fileName = uuid.v4() + "jpg";
			img.mv(path.resolve(__dirname, "..", "static", fileName));
			const recipe = await Recipe.create({
				name,
				img: fileName,
				typeId,
				brandId,
			});

			if (instructions) {
				instructions = JSON.parse(instructions);
				instructions.forEach((i) =>
					Instruction.create({
						title: i.title,
						description: i.description,
						recipeId: recipe.id,
					})
				);
			}
			if (ingridients) {
				ingridients = JSON.parse(ingridients);
				ingridients.forEach((i) =>
					Ingridient.create({
						name: i.name,
						amount: i.amount,
						amount_type: i.amount_type,
						recipeId: recipe.id,
					})
				);
			}

			return res.json(recipe);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		let { brandId, typeId, limit, page } = req.query;
		let recipes;
		page = page || 1;
		limit = limit || 5;
		let offset = page * limit - limit;
		if (!brandId && !typeId) {
			recipes = await Recipe.findAndCountAll({
				limit,
				offset,
			});
		} else if (brandId && !typeId) {
			recipes = await Recipe.findAndCountAll({
				where: { brandId },
				limit,
				offset,
			});
		} else if (!brandId && typeId) {
			recipes = await Recipe.findAndCountAll({
				where: { typeId },
				limit,
				offset,
			});
		} else if (brandId && typeId) {
			recipes = await Recipe.findAndCountAll({
				where: { typeId, brandId },
				limit,
				offset,
			});
		}
		return res.json(recipes);
	}
	async getOne(req, res) {
		const { id } = req.params;
		const recipe = await Recipe.findOne({
			where: { id },
			include: [
				{
					model: Instruction,
					as: "instructions",
				},
				{
					model: Ingridient,
					as: "ingridients",
				},
			],
		});
		return res.json(recipe);
	}
}

module.exports = new RecipesController();
