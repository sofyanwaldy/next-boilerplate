import React from 'react'
import PropTypes from 'prop-types'

const MetaTag = (props) => {
  const { article } = props
  return (
    <>
      <title>{article.judul}</title>
      <meta name="title" content={ article.judul } />
      <meta name="description" content={ article.judul } />
      <meta name="msvalidate.01" content="6E2B74B4662B59307E917A7B23F79026" />
      <meta name="author" content="Penulis: Joan Aurelia" />
      <meta name="googlebot-news" content="index,follow"/>
      <meta name="googlebot" content="index,follow"/>
      <meta name="robots" content="index,follow"/>
      <meta name="language" content="id"/>
      <meta name="geo.country" content="id"/>
      <meta name="news_keywords" content="ritel, forever 21, mode, fashion, tren, lifestyle, busana, mild report" />
      <meta name="keywords" content="ritel, forever 21, mode, fashion, tren, lifestyle, busana, mild report" />
      <meta httpEquiv="content-language" content="In-Id"/>
      <meta name="geo.placename" content="Indonesia"/>
      <meta name="apple-itunes-app" content="app-id=1282972796" />
      <meta property="fb:pages" content="1515768312081946"/>
      <meta property="fb:app_id" content="474316002755630"/>
      <meta property="og:image" content="https://mmc.tirto.id/image/otf/1024x535/2019/10/01/forever-21.jpg"/>
      <meta property="og:locale" content="id_ID"/>
      <meta property="og:type" content="article"/>
      <meta property="og:title" content="Forever 21 Bangkrut: Kisah Imigran Korsel dan Upaya Membaca Zaman - Tirto.ID"/>
      <meta property="og:description" content={ article.judul }/>
      <meta property="og:url" content="https://tirto.id/forever-21-bangkrut-kisah-imigran-korsel-dan-upaya-membaca-zaman-ejeC"/>
      <link rel="canonical" href="https://tirto.id/forever-21-bangkrut-kisah-imigran-korsel-dan-upaya-membaca-zaman-ejeC"/>
      <meta property="og:image:type" content="image/jpg"/>
      <meta property="og:image:width" content="600"/>
      <meta property="og:image:height" content="315"/>
      <meta property="og:site_name" content="tirto.id"/>
      <meta property="article:author" content="https://www.facebook.com/TirtoID" itemProp="author"/>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tirtoid" />
      <meta name="twitter:title" content="Forever 21 Bangkrut: Kisah Imigran Korsel dan Upaya Membaca Zaman - Tirto.ID" />
      <meta name="twitter:description" content={ article.judul } />
      <meta name="twitter:image" content="https://mmc.tirto.id/image/otf/880x495/2019/10/01/forever-21.jpg" />
      <meta name="twitter:image:src" content="https://mmc.tirto.id/image/share/tw/2019/10/01/forever-21.jpg"/>
      <meta name="thumbnail" content="https://mmc.tirto.id/image/otf/880x495/2019/10/01/forever-21.jpg"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#039ad9"/>
      <meta name="ahrefs-site-verification" content="ec1b61b8a6d9a5eb3d9d0f2ce8f64e74e4e7c071551fad1f503467b3f6d2965d" />
      <meta httpEquiv="refresh" content="900"/>
    </>
  )
}

MetaTag.propTypes = {
  article: PropTypes.object.isRequired
}
export default MetaTag
