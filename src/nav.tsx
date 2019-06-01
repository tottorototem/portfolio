import * as React from 'react';
import { Link } from "react-router-dom";
import { PortfolioContext } from './portfolio';

export const Nav: React.FC = () => {
	const { state } = React.useContext(PortfolioContext);

	return (
		<nav>
			<ul>
				{state.groups.map((group, index) => (
					<li key={index}>
						<Link to={`/${group.id}`}>{group.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}