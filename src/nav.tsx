import * as React from 'react';
import { Link } from "react-router-dom";
import { PortfolioContext } from './portfolio';

export const Nav: React.FC = () => {
	const { state, dispatch } = React.useContext(PortfolioContext);
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleMouseEnter = (groupId: string) => () => {
		dispatch('HIGHLIGHT_GROUP', groupId);
	};

	const handleMouseLeave = () => {
		dispatch('UNHIGHLIGHT_GROUP');
	};

	return (
		<nav data-expanded={expanded}>
			<button type="button" onClick={handleExpandClick}>
				toggle navigation menu
			</button>
			<ul>
				<li>
					<Link to="/" onClick={handleExpandClick} tabIndex={0}>Home</Link>
				</li>
				{state.groups.map((group, index) => (
					<li key={index} onMouseEnter={handleMouseEnter(group.id)} onMouseLeave={handleMouseLeave}>
						<Link data-highlighted={group.id === state.highlightedGroupId} to={`/${group.id}`} onClick={handleExpandClick} tabIndex={0}>{group.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}