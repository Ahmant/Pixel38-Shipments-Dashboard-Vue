import { createRouter, createWebHistory } from "vue-router";
import AuthMiddleware from '@/middlewares/auth'

import EmptyLayout from '../layouts/EmptyLayout.vue'

const routes = [
	{
		path: "/",
		redirect: "auth/login"
	},
	{
		path: "/auth",
		component: EmptyLayout,
		name: 'auth',
		meta: {
			middleware: AuthMiddleware
		},
		children: [
			{
				path: "login",
				name: "auth.login",
				component: () => import("../views/auth/LoginView.vue"),
				meta: {
					title: "Login",
				}
			},
			{
				path: "register",
				name: "auth.register",
				component: () => import("../views/auth/RegisterView.vue"),
				meta: {
					title: "Register",
				}
			},
			{
				path: "verify-email/:userId",
				name: "auth.verify-email",
				component: () => import("../views/auth/VerifyEmailView.vue"),
				meta: {
					title: "Verify",
				}
			},
		]
	},
	{
		path: "/dashboard",
		component: () => import("../layouts/dashboard/DashboardLayout.vue"),
		meta: {
			middleware: AuthMiddleware
		},
		children: [
			{
				path: "",
				name: "dashboard",
				component: () => import("../views/dashboard/DashboardView.vue"),
				meta: {
					title: "Dashboard",
				}
			},
			{
				path: "shipments",
				component: EmptyLayout,
				children: [
					{
						path: "",
						name: "shipments",
						component: () => import("../views/dashboard/shipments/ShipmentsIndexView.vue"),
						meta: {
							title: "Shipments",
						}
					},
					{
						path: "create",
						name: "shipments.create",
						component: () => import("../views/dashboard/shipments/ShipmentsFormView.vue"),
						meta: {
							title: "Shipments create",
						}
					},
					{
						path: "edit/:id",
						name: "shipments.edit",
						component: () => import("../views/dashboard/shipments/ShipmentsFormView.vue"),
						meta: {
							title: "Shipments edit",
						}
					},
				]
			},
		]
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

function nextFactory(context, middleware, index) {
	const subsequenceMiddleware = middleware[index];
	if (!subsequenceMiddleware) {
		return context.next;
	}

	return (...parameters) => {
		context.next(...parameters);
		const nextMiddleware = nextFactory(context, middleware, index + 1);
		subsequenceMiddleware({ ...context, next: nextMiddleware })
	}
}

router.beforeEach((to, from, next) => {
	if (to.meta.middleware) {
		const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
		const context = { from, next, router, to };
		const nextMiddleware = nextFactory(context, middleware, 1);

		return middleware[0]({ ...context, next: nextMiddleware });
	}

	return next();
})

export default router

