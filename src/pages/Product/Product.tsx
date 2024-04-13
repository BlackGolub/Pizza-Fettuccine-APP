import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Headling from '../../components/Headling/Headling'
import { PREFIX } from '../../helpers/API'
import type { Product } from '../../interfaces/product.interface'
import { cartActions } from '../../store/card.slice'
import { AppDispatch } from '../../store/store'
import styles from './Product.module.css'

export function Product() {
	const { id } = useParams()
	const [data, setData] = useState<Product | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${PREFIX}/products/${id}`)
				setData(response.data)
			} catch (error) {
				console.error('Error occurred while fetching data:', error)
			}
		}

		fetchData()
	}, [id])

	const addToCart = () => {
		if (data) {
			dispatch(cartActions.add(data.id))
		}
	}

	if (!data) {
		return <div>Loading...</div>
	}

	return (
		<>
			<Headling className={styles['headling']}>
				<button className={styles['to-menu']} onClick={() => navigate('/')}>
					{'<'}
				</button>
				{data.name}
				<Button
					appearance={'small'}
					className={styles['add-button']}
					onClick={addToCart}
				>
					<img
						className={styles['cart-icon']}
						src='/cart-button-icon.svg'
						alt='Иконка корзины'
					/>
					<span>В корзину</span>
				</Button>
			</Headling>
			<div className={styles['product-card']}>
				<img
					src={data.image}
					alt='Изображение товара'
					className={styles['img-card']}
				/>
				<div className={styles['product-info']}>
					<div className={styles['row']}>
						<span>Цена</span>
						<div className={styles['row-value']}>
							{data.price}&nbsp;
							<span>₽</span>
						</div>
					</div>
					<hr className={styles['hr']} />
					<div className={styles['row']}>
						<span>Рейтинг</span>
						<div className={styles['rating-value']}>
							{data.rating}&nbsp;
							<img
								src='/star-icon.svg'
								alt='рейтинг'
								className={styles['rating-img']}
							/>
						</div>
					</div>
					<div className={styles['ingredients']}>
						<span>Состав:</span>
						<ul className={styles['ingredient-list']}>
							{data.ingredients.map((ingredient, i) => (
								<li key={i} className={styles['ingredient']}>
									{ingredient}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
