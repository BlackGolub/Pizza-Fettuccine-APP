import axios from 'axios'
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'
import { PREFIX } from './helpers/API.ts'
import './index.css'
import { AuthLayout } from './layout/Auth/AuthLayout.tsx'
import { Layout } from './layout/Layout/Layout.tsx'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'
import { Login } from './pages/Login/Login.tsx'
import { Product } from './pages/Product/Product.tsx'
import { Register } from './pages/Register/Register.tsx'
import { Success } from './pages/Success/Success.tsx'
import { store } from './store/store.ts'

const Menu = lazy(() => import('./pages/Menu/Menu'))

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				),
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/success',
				element: <Success />,
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: axios
							.get(`${PREFIX}/products/${params.id}`)
							.then(data => data),
					})
				},
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
	{
		path: '*',
		element: <Error />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
