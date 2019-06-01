import * as React from 'react';
import { PortfolioContext, IImage } from '../portfolio';

export const View: React.FC = (props: any) => {
	const { state } = React.useContext(PortfolioContext);
	const [image, setImage] = React.useState<IImage>();

	React.useEffect(() => {
		const activeImage = parseInt(props.match.params.imageId);
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

	return image ? <img src={image.url} alt={image.name} /> : null;
}