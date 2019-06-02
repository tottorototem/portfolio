import * as React from 'react';
import { PortfolioContext, IImage, IGroup } from '../portfolio';
import { Link } from 'react-router-dom';

export const View: React.FC = (props: any) => {
	const { state } = React.useContext(PortfolioContext);
	const [group, setGroup] = React.useState<IGroup>();
	const [image, setImage] = React.useState<IImage>();

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

	React.useEffect(() => {
		const activeImage = props.match.params.imageId;
		let search;

		state.groups.forEach(group => {
			group.images.forEach(image => {
				if (image.id === activeImage) {
					search = image;
				}
			});
		});

		setImage(search);
	}, [props.match.params.imageId, state.groups]);

	return image ? (
		<>
			<Link to={`/${group ? group.id : ''}`} />
			<img className="view" src={image.url} alt={image.id} />
		</>
	) : null;
}