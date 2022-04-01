// utils -> transformHtml

import { DOMParser } from 'linkedom'

/**
 * @param inputHtml {string}
 * @param transform {(Document)=>Document}
 * @returns {Promise<string>}
 */
export default (inputHtml, transform = null) => {
	const $article = new DOMParser().parseFromString(inputHtml, 'text/html')
	return (transform?.call($article, $article) ?? $article).documentElement.innerHTML
}