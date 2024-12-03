import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords, author }) => {
	return (
		<>
			<Helmet>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
			</Helmet>
		</>
	)
}

Meta.defaultProps = {
	title: 'Online Computer Store | Home',
	description: 'Best products at an affordable price',
	keywords: 'buy, computer, electronics',
}

export default Meta
