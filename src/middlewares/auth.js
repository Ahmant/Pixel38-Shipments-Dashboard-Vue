export default function auth({ next, router, to }) {
	if (!localStorage.getItem('auth_token')) {
		if (to.matched[0].name != 'auth') {
			return router.push({ name: 'auth.login' });
		}
	}
	else if (to.matched[0].name == 'auth') {
		return router.push({ name: 'dashboard' });
	}

	return next();
}