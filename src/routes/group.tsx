import * as React from 'react';
import { PortfolioContext, IGroup } from '../portfolio';
import { Link } from 'react-router-dom';
import { baseUrl } from '..';

export const Group: React.FC = (props: any) => {
	const { state } = React.useContext(PortfolioContext);
	const [group, setGroup] = React.useState<IGroup>();

	React.useEffect(() => {
		const activeGroup = props.match.params.groupId;
		let search;
		state.groups.forEach(group => {
			if (group.id === activeGroup) {
				search = group;
			}
		});
		setGroup(search);
	}, [props.match.params.groupId]);

	if (group) {
		return (
			<ul className="group-page">
				{group.images.map((image, index) => (
					<Link key={index} to={`/${group.id}/${image.id}`}>
						<li key={index}>
							<img src={`${baseUrl()}${image.url}`} alt={image.id} />
						</li>
					</Link>
				))}
			</ul>
		)
	}
	return null;
}