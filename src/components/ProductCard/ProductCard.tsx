import cn from 'classnames'
import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartActions } from '../../store/card.slice'
import { AppDispatch } from '../../store/store'
import styles from './ProductCard.module.css'
import { ProductCardProps } from './ProductCard.props'

function ProductCard({
	id,
	name,
	ingredients,
	image,
	price,
	rating,
}: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>()

	const add = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(cartActions.add(id))
	}

	return (
		<Link to={`/product/${id}`} className={styles['link']}>
			<div className={cn(styles['card'])}>
				<div
					className={styles['head']}
					style={{
						backgroundImage: `url('${image}')`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
					}}
				>
					<div className={styles['price']}>
						{price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<img src='/cart-button-icon.svg' alt='Добавить в корзину' />
					</button>
					<div className={styles['rating']}>
						{rating}&nbsp;
						<img src='/star-icon.svg' alt='Иконка звезды' />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{name}</div>
					<div className={styles['description']}>{ingredients}</div>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
