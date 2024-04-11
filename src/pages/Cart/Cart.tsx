import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import CartItem from '../../components/CartItem/CartItem'
import Headling from '../../components/Headling/Headling'
import { PREFIX } from '../../helpers/API'
import { Product } from '../../interfaces/product.interface'
import { cartActions } from '../../store/card.slice'
import { AppDispatch, RootState } from '../../store/store'
import styles from './Cart.module.css'

const DELIVERY_FEE = 169

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([])
	const items = useSelector((s: RootState) => s.cart.items)
	const jwt = useSelector((s: RootState) => s.user.jwt)
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const total = items
		.map(i => {
			const product = cartProducts.find(p => p.id === i.id)
			if (!product) {
				return 0
			}
			return i.count * product.price
		})
		.reduce((acc, i) => (acc += i), 0)

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`)
		return data
	}

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)))
		setCartProducts(res)
	}

	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: items,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		)
		dispatch(cartActions.clean())
		navigate('/success')
	}

	useEffect(() => {
		loadAllItems()
	}, [items])

	return (
		<>
			<Headling className={styles['headling']}>Корзина</Headling>
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id)
				if (!product) {
					return
				}
				return <CartItem key={i.id} count={i.count} {...product} />
			})}
			<div className={styles['line']}>
				<div className={styles['text']}>Итого</div>
				<div className={styles['prise']}>
					{total}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['prise']}>
					{DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>
					Итог <span className={styles['total-count']}>({items.length})</span>
				</div>
				<div className={styles['prise']}>
					{total + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['checkout']}>
				<Button appearance='big' onClick={checkout}>
					оформить
				</Button>
			</div>
		</>
	)
}
