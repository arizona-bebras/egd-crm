import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const route = params.slug;
	return {
		route,
	};
};
