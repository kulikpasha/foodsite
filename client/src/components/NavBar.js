import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
const NavBar = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const logOut = () => {
		user.setUser({});
		user.setIsAuth(false);
	};

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
					Карусель рецептов
				</NavLink>
				{user.isAuth ? (
					<Nav className="ml-auto" style={{ color: "white" }}>
						<Button
							variant={"outline-light"}
							onClick={() => navigate(ADMIN_ROUTE)}
						>
							Админ панель
						</Button>
						<Button
							variant={"outline-light"}
							onClick={() => logOut()}
							className="ml-2"
						>
							Выйти
						</Button>
					</Nav>
				) : (
					<Nav className="ml-auto" style={{ color: "white" }}>
						<Button
							variant={"outline-light"}
							onClick={() => navigate(LOGIN_ROUTE)}
						>
							Авторизация
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	);
});

export default NavBar;
