import { extract } from './src/main.js'

const test = async(url) => {

	const article = await extract(url)
	console.log(article)

}

test('https://www.theverge.com/23003212/oneplus-10-pro-review-screen-price-specs-battery')