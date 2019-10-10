import React from 'react'
import PropTypes from 'prop-types'
import { decode } from '../libraries/url'
import ArticleDefault from '../components/templates/ArticleDefault'
import { articlebyid } from '../libraries/DataSource'
import MetaTag from '../components/atoms/MetaTag'
import Head from 'next/head'
// import NodeCache from 'node-cache'

const Slug = (props) => {
  const { article } = props
  return (
    <>
      <Head>
        <MetaTag article={article} />
      </Head>
      <ArticleDefault article={article} />
    </>
  )
}

Slug.getInitialProps = async ({ query: { slug } }) => {
  const allSlug = decodeURIComponent(slug).split('-')
  let arrgetID = allSlug.slice(-1)[0]
  if (arrgetID.length === 2) {
    if (arrgetID[0] === 'q') {
      arrgetID = slug.slice(-2)[0]
    }
  }
  const getID = decode(arrgetID.trim())
  // const keyCache = 'tirto::article::' + getID
  // const myCache = new NodeCache({
  //   stdTTL: 300,
  //   checkperiod: 300
  // })
  // let article = myCache.get(keyCache)
  // if (!article) {
  const article = await articlebyid(getID)
  //   myCache.set(keyCache, article)
  //   console.log('salmon mengikuti arus')
  // }
  // const article = await articlebyid(getID)
  return { slug, article }
}

Slug.propTypes = {
  // url: PropTypes.string.isRequired,
  slug: PropTypes.string,
  article: PropTypes.object.isRequired
}

export default Slug
