import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'


const ProductCarousel = () => {
	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const productTopRated = useSelector((state) => state.productTopRated)
	const { loading, error, products } = productTopRated

	// make request here upon component load
	useEffect(() => {
		dispatch(listTopProducts())
	}, [dispatch]) // Dependencies, on change they fire off useEffect

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-light'>
			{products.map((product) => (
				<Carousel.Item key={product._id} interval={2000}>
					<Link to={`/product/${product._id}`}>
						<div className='img-box'>
							<Image
								src={product.image}
								alt={product.name}
								fluid
								style={{
									maxHeight: '100%', // 限制最大高度
									maxWidth: '100%', // 限制最大宽度
									objectFit: 'contain', // 保持图片比例缩放
									margin: '0 auto', // 居中对齐
								}}
							/>
						</div>
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{product.name} ($ {product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel
