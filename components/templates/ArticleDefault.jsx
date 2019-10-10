import React from 'react'
import PropTypes from 'prop-types'
import MetaTag from '../atoms/MetaTag'

const ArticleDefault = (props) => {
  const { article } = props
  return (
    <>
      <MetaTag article={article} />
      <article className="text_detail">
        <h1 className="news-detail-title">
          { article.judul }
        </h1>
      </article>
    </>
  )
}

ArticleDefault.propTypes = {
  article: PropTypes.object.isRequired
}

export default ArticleDefault
