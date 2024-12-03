import express from 'express'
const router = express.Router()
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
	getProductsByCategory, // 添加按类别获取产品的控制器
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// 获取所有产品或创建新产品（需要管理员权限）
router.route('/').get(getProducts).post(protect, admin, createProduct)

// 获取按类别筛选的产品
router.route('/category/:category').get(getProductsByCategory) // 新增路由

// 创建产品评论
router.route('/:id/reviews').post(protect, createProductReview)

// 获取评分最高的产品
router.get('/top', getTopProducts)

// 获取单个产品 / 删除产品 / 更新产品
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)

export default router
