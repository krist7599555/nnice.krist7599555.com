export const prerender = 'auto';
export const csr = true;
export const ssr = true;

export const load = async ({ url }) => {
	return {
		pathname: url.pathname
	};
};
