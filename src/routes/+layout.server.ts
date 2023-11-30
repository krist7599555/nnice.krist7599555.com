export const prerender = 'auto';
export const csr = false;
export const ssr = true;

export const load = async ({ url }) => {
	return {
		pathname: url.pathname
	};
};
