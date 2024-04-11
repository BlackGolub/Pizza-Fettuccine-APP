import { Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { Await, useLoaderData, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Headling from '../../components/Headling/Headling'
import { Product } from '../../interfaces/product.interface'
import { cartActions } from '../../store/card.slice'
import { AppDispatch } from '../../store/store'
import styles from './Product.module.css'

export function Product() {
	const data = useLoaderData() as { data: Product }
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const addToCart = () => {
		dispatch(cartActions.add(data.data.id))
	}

	return (
		<>
			<Suspense fallback={'Загружаю...'}>
				<Await resolve={data.data}>
					{({ data }: { data: Product }) => (
						<>
							<Headling className={styles['headling']}>
								<button
									className={styles['to-menu']}
									onClick={() => navigate('/')}
								>
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
					)}
				</Await>
			</Suspense>
		</>
	)
}
