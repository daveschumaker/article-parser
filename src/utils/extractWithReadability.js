// utils/extractWithReadability

import { Readability } from '@mozilla/readability'
import { DOMParser } from 'linkedom'
import isHTMLString from './isHTMLString.js'

/**
 * @param html {string}
 * @param inputUrl {string}
 * @returns {string|null}
 */
export default (html, inputUrl = '') => {
  if (!isHTMLString(html)) return null

  // TODO: This should probably be extracted from out of this function and
  // run before passing data into extractWithReadability. That way, we can
  // better transform tags that things like Readability might exclude.
  let doc = new DOMParser().parseFromString(html, 'text/html')

  // Fix issues with "aside" tags on websites such as Engadget and The Verge,
  // where they embed quotes within the actual article.
  // doc.querySelectorAll('aside').forEach(node => {
  //   const newNode = doc.createElement('div')
  //   newNode.innerHTML = node.innerHTML
  //   node.parentNode.replaceChild(newNode, node)
  // })

  // // Convert "q" tags into blockquotes.
  // doc.querySelectorAll('q').forEach(node => {
  //   const newNode = doc.createElement('blockquote')
  //   newNode.innerHTML = node.innerHTML
  //   node.parentNode.replaceChild(newNode, node)
  // })

  const base = doc.createElement('base')
  base.setAttribute('href', inputUrl)
  doc.head.appendChild(base)
  const reader = new Readability(doc)
  const result = reader.parse() || {}
  return result.textContent ? result.content : null
}

export function extractTitleWithReadability (html) {
  if (!isHTMLString(html)) return null
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const reader = new Readability(doc)
  // noinspection JSUnresolvedFunction
  return reader._getArticleTitle()
}
