import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import RecipeStore from "./store/RecipeStore";

export const Context = createContext(null);

ReactDOM.render(
	<Context.Provider
		value={{
			user: new UserStore(),
			recipe: new RecipeStore(),
		}}
	>
		<App />
	</Context.Provider>,
	document.getElementById("root")
);
