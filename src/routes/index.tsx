import * as React from 'react';
import { PortfolioContext } from '../portfolio';
import { Link } from 'react-router-dom';

export const Index: React.FC = (props: any) => {
	const { state, dispatch } = React.useContext(PortfolioContext);

	const abbreviatedGroups = state.groups.map(group => {
		return {
			...group,
			images: group.images.length > 2
				? [group.images[0], group.images[1], group.images[2]]
				: group.images.length > 1
					? [group.images[0], group.images[1]]
					: [group.images[0]]
		};
	});

	const handleMouseEnter = (groupId: string) => () => {
		dispatch('HIGHLIGHT_GROUP', groupId);
	};

	const handleMouseLeave = () => {
		dispatch('UNHIGHLIGHT_GROUP');
	};

	return (
		<ul>
			{abbreviatedGroups.map((group, groupIndex) => (
				<li key={groupIndex} data-highlighted={group.id === state.highlightedGroupId} onMouseEnter={handleMouseEnter(group.id)} onMouseLeave={handleMouseLeave}>
					<Link to={`/${group.id}`}>
						<ul>
							{group.images.map((image, imageIndex) => (
								<li key={imageIndex}>
									<img src={image.url} alt={image.name} />
								</li>
							))}
						</ul>
					</Link>
				</li>
			))}
		</ul>
	)
}