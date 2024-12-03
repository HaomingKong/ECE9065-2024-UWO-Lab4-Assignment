import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { listProductsByCategory } from '../actions/productActions' // 使用按类别加载的 action

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword

	// 从 URL 参数获取当前页码
	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	// 添加当前类别的状态
	const [currentCategory, setCurrentCategory] = useState('laptops') // 默认类别为 'laptops'

	// 从 Redux 中获取产品列表状态
	const productList = useSelector((state) => state.productList)
	const { loading, error, products, page, pages } = productList

	useEffect(() => {
		if (keyword) {
			dispatch(listProducts(keyword, currentCategory, pageNumber)) // 调用listProducts来根据keyword搜索
		} else {
			dispatch(listProductsByCategory(currentCategory, pageNumber)) // 没有keyword则按类别显示
		}
	}, [dispatch, keyword, currentCategory, pageNumber])


	// 定义类别选项
	const categories = ['laptops', 'desktops', 'monitors', 'accessories'] // 可选类别

	// 渲染类别按钮
	const renderCategories = () =>
		categories.map((cat) => (
			<Button
				key={cat}
				variant={currentCategory === cat ? 'primary' : 'light'}
				onClick={() => setCurrentCategory(cat)}
			>
				{cat.toUpperCase()}
			</Button>
		))

	return (
		<>
			<Meta/>
			{/* 顶部推荐栏（当没有搜索关键字时显示） */}
			{!keyword ? (
				<ProductCarousel/>
			) : (
				<Link className='btn btn-light' to='/'>
					Go Back
				</Link>
			)}
			<p></p>
			{/* 顶部类别切换按钮 */}
			<div className="d-flex mb-4">{renderCategories()}</div>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader/>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row className="align-items-stretch">
						{products.map((product) => (
							<Col key={product._id} sm={12} md="6" lg={4} xl={3}>
								<Product product={product}/>
							</Col>
						))}
					</Row>
					{/* 分页组件 */}
					<Paginate pages={pages} page={page} category={currentCategory}/>
				</>
			)}
		</>
	)
}

export default HomeScreen
