export const prerender = true;
export const csr = true;
export const ssr = true;

export const load = async ({ url }) => {
	return {
		pathname: url.pathname
	};
};
