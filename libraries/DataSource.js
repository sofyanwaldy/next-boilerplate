import axios from 'axios'

function credential() {
  let options = {}
  options.baseURL = process.env.API_URL
  if (process.env.API_USERNAME !== undefined || process.env.API_PASSWORD !== undefined) {
    options.auth = {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    }
  }
  return options
}

export async function metaTag(url, databack = null) {
  let dataTag = await metatag(url)

  let metaReplace = {}
  metaReplace.title = 'Tirto.id: Berita dan Analisa Terkini'
  metaReplace.keywords = 'Media online terkini, info nasional, internasional, ekonomi, sosial, news analisis'
  metaReplace.description = 'Media online terkini, info nasional, internasional, ekonomi, sosial, dan news analisis untuk Anda'
  metaReplace.share_tw = 'https://mmc.tirto.id/image/share/tw/2018/04/04/logo-tirto-1.jpg'
  metaReplace.share_fb = 'https://mmc.tirto.id/image/share/fb/2018/04/04/logo-tirto-1.jpg'
  metaReplace.thumbnail = '2018/04/04/logo-tirto-1.jpg'

  if (dataTag && dataTag.length > 0 && dataTag[0].name !== 'empty_meta') {
    for(let meta in dataTag) {
      metaReplace[dataTag[meta].name] = dataTag[meta].content  
    }
    let olahkeyword = metaReplace.keywords.split(',')
    let hasilkeyword = ''
    for(let keyword in olahkeyword) {
      if (keyword === '0') {
        hasilkeyword = olahkeyword[keyword].split(' : ')[0]
      }
      else {
        hasilkeyword = hasilkeyword + ', ' + olahkeyword[keyword].split(' : ')[0]  
      }
    }
    metaReplace.keywords = hasilkeyword
    if (databack !== null) {
      metaReplace.thumbnail = (databack.image.length > 0 && databack.image[0].url) || ''
      metaReplace.share_tw = 'https://mmc.tirto.id/image/share/tw/' + metaReplace.thumbnail
      metaReplace.share_fb = 'https://mmc.tirto.id/image/share/fb/' + metaReplace.thumbnail
    } else {
      metaReplace.share_tw = 'https://mmc.tirto.id/image/share/tw/' + metaReplace.thumbnail
      metaReplace.share_fb = 'https://mmc.tirto.id/image/share/fb/' + metaReplace.thumbnail
    }
  } else if (databack !== null) {
    metaReplace.title = databack.judul || ''
    metaReplace.description = databack.ringkasan || ''
    metaReplace.thumbnail = (databack.image.length > 0 && databack.image[0].url) || ''
    metaReplace.share_tw = 'https://mmc.tirto.id/image/share/tw/' + metaReplace.thumbnail
    metaReplace.share_fb = 'https://mmc.tirto.id/image/share/fb/' + metaReplace.thumbnail

    let hasilkeyword = ''
    for(let listkeyword in databack.keyword) {
      if (databack.keyword[listkeyword].name && typeof (databack.keyword[listkeyword].name) !== 'undefined') {
        if (listkeyword === '0') {
          hasilkeyword = databack.keyword[listkeyword].name.split(' : ')[0]
        }
        hasilkeyword = hasilkeyword + ', ' + databack.keyword[listkeyword].name.split(' : ')[0]
      }
    }
    metaReplace.keywords = hasilkeyword

  }
  return metaReplace
}

export function vparam(obj) {
  let str = []
  for (let p in obj)
    if (obj.hasOwnProperty(p) && p !== 'page') {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
  return str.join("&")
}

export function pagination(c, m) {
  let current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || i >= left && i < right) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

export function encode(num) {
  const alphabet = process.env.ALPHABET
  const base = alphabet.length
  let encoded = ''
  while (num) {
    let remainder = num % base
    num = Math.floor(num / base)
    let string = alphabet.charAt(remainder)
    encoded = string + encoded
  }
  let hasil = encoded
  return hasil
}

export function decode(str) {
  const alphabet = process.env.ALPHABET
  const base = alphabet.length
  let decoded = 0
  while (str) {
    let index = alphabet.indexOf(str.charAt(0))
    let power = str.length - 1
    decoded = decoded + index * Math.pow(base, power)
    str = str.substr(1)
  }
  return decoded
}

export function slugdecode(str) {
  let splitstr = str.split('-')
  let strslug = splitstr[splitstr.length - 1]
  let hasil = decode(strslug)
  return hasil
}

export function httpcurl(url) {
  // let options = cred == true ? credential() : { baseURL: process.env.API_URL } 
  let options = credential()
  // console.log(options)
  return axios.get(url, options)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('no content')
      }
      return response
    })
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      // if (error.response.data == 404) {
      return {
        info: {
          limit: 1,
          total: 0,
          page: 1
        },
        success: false,
        message: 'Not Found',
        data: []
      }
      // }
      // console.log(error)
      // console.error(error.response.data);    // ***
      // console.error(error.response.status);  // ***
      // console.error(error.response.headers); // ***
    })
    // .finally(data => data)
}

function config() {
  let apiUri = '/apis' // dibiarkan kosong karena axios udah ada baseURL tanpa perlu full URL gapapa
  // let apiUsername = credential().auth.username
  let apiUriDev = '/apisdev'
  let apiUsername = process.env.API_USERNAME
  let apiPassword = process.env.API_PASSWORD
  let baseUri = process.env.URL
  return {
    'prefixRedis': 'local',
    'urlListArticleToReplace': '//tirto.id',
    'arrSocialMedia': [{
      1: 'Facebook',
      2: 'Twitter',
      3: 'Pinterest'
    }],
    'urlNavBarToReplace': 'https://tirto.id',
    'urlAMP': 'http://amp.tirto.dev',
    'urlNavBarReplacer': baseUri,
    'apiLatestArticle': apiUri + '/articlef/latest/',
    'apiDetailArticle': apiUri + '/articlef/detail/',
    'apiDetailProfile': apiUri + '/profilef/detail/',
    'apiLatestProfile': apiUri + '/profilef/latest/',
    'apiPopupBannerDetail': apiUri + '/banner/keyword?',
    'apiLatestKeyword': apiUri + '/keywordf/latest/',
    'apiLatestBerita': apiUri + '/listberita/latest/',
    'apiLatestPersepsi': apiUri + '/persepsi/latest/',
    'apiDetailPersepsi': apiUri + '/persepsi/detail/',
    'hostImage': 'https://mmc.tirto.id/image/',
    'imageDefault': '2016/05/12/TIRTOID-logo-01.jpg',
    // 'persepsi' : str_replace('http://','https://',baseUri).'/x/',
    'persepsi': baseUri + '/x/',
    'apiLatestTopicAll': apiUri + '/topicf/latest/all',
    'apiHeadlineTopic': apiUri + '/topicf/headline',
    'apiLatestTopic': apiUri + '/topicf/detail/',
    'apiLatestBeritaTokoh': apiUri + '/articlef/tokoh/',
    'pathStatic': '/data/static/tirto-desktop/',
    'apiLatestKolumnis': apiUri + '/articlef/kolumnis/',
    'apiTopNewsmaker': apiUri + '/newsmaker/headline',
    'apiLatestPersepsi': apiUri + '/persepsi/latest/',
    'apiDetailAuthor': apiUri + '/authorf/detail/',
    'apiLatestAuthor': apiUri + '/authorf/latest/',
    'apiListKolumnis': apiUri + '/kolumnisf/latest/',
    'apiDetailKolumnis': apiUri + '/kolumnisf/detail/',
    'apiPopularProfile': apiUri + '/popularf/tokoh/all',
    'apiPopularArticle': apiUri + '/popularf/latest/all',
    'apiPopularKeyword': apiUri + '/popularf/keyword/',
    'apiPartner' : apiUri + '/partner/popular/latest/',
    'apiSearch': apiUri + '/searchf',
    'apiSearchGoogle': apiUri + '/searchg',
    'apiReplacer': apiUri + '/meta?id=https://tirto.id',
    'apiEmbed': apiUri + '/embed/detail/',
    'apiLatestInfografik': apiUri + '/infografikf/latest',
    'apiImsakiyah2018': apiUri + '/ot/jadwalimsakiyahlistkota2018',
    'apiJadwalImsakiyah2018': apiUri + '/ot/jadwalimsakiyah2018',
    'apiPPDB2018': apiUri + '/ot/ppdb2018',
    'apiPildun2018PlayerDetail': apiUri + '/football/player/detail/',
    'apiInstagram': 'https://ot.tirto.id/tvr/instagram', // untuk tvr jangan pake /apis, tapi pake url ot.tirto.id
    'apiPopularStories': apiUri + '/popular/stories',
    'limitedTitleDate': '2016-10-17',
    'hariPahlawanTopicId': '581c4d01054a5bef149f16ac',
    'skinner': [{
      'img_left': 'pilkada/skinner-left.jpg',
      'img_right': 'pilkada/skinner-right.jpg',
      'link': '/dki'
    }],
    'utmBaseUrl': '//tirto.id',
    'utmPhraseList': ['babe', 'bacaberita', 'baca berita'],
    'default_desc': 'Media online terkini, info nasional, internasional, ekonomi, sosial, dan news analisis untuk Anda',
    'apiPilkadaSentiment': apiUri + '/socmedSentiments',
    'apiPilkadaKeywordByChannel': apiUri + '/keywordf/latest/',
    'apiPilkadaCalcium': apiUri + '/calcium/latest/all',
    'apiSentimentHeadline': apiUri + '/topicf/sentimentHeadline',
    'apiTopicDetailMercury': apiUri + '/topicf/mercuryDetail/',
    'pilkada': [{
      'show_klasemen': true,
      'topic_id': '58774a00bf8c569b1588b393',
      'keyword_id': 7703,
      'fact_channel_id': 84,
      'candidates': [{
        'agus_sylvi': [{
          'profile_id': [{
            'cagub': 1359,
            'cawagub': 1360
          }],
          'profile_id_paslon': 2020,
          'keyword_id': 17150,
          'keyword_channel_id': 82,
          'foto_keyword_id': 17150,
          'foto_channel_id': 83,
          'video_keyword_id': 17150,
          'video_channel_id': 10,
          'infografik_keyword_id': 17150,
          'infografik_channel_id': 73,
          'quote_keyword_id': 11992,
          'photo': 'ahy.png'
        }],
        'ahok_djarot': [{
          'profile_id': [{
            'cagub': 5,
            'cawagub': 619
          }],
          'profile_id_paslon': 2021,
          'keyword_id': 17083,
          'keyword_channel_id': 82,
          'foto_keyword_id': 17083,
          'foto_channel_id': 83,
          'video_keyword_id': 17083,
          'video_channel_id': 10,
          'infografik_keyword_id': 17083,
          'infografik_channel_id': 73,
          'quote_keyword_id': 21728,
          'photo': 'ahok.png'
        }],
        'anies_sandiaga': [{
          'profile_id': [{
            'cagub': 453,
            'cawagub': 238
          }],
          'profile_id_paslon': 2022,
          'keyword_id': 17250,
          'keyword_channel_id': 82,
          'foto_keyword_id': 17250,
          'foto_channel_id': 83,
          'video_keyword_id': 17250,
          'video_channel_id': 10,
          'infografik_keyword_id': 17250,
          'infografik_channel_id': 73,
          'quote_keyword_id': 2191,
          'photo': 'anies.png'
        }],
      }],
      'stat_multiplier': [{
        'twitter': 1,
        'facebook': 1,
        'news': 1
      }],
      'stat_image': [{
        'today': 'https://mmc.tirto.id/image/2017/01/03/share-pilkada-dki-timeter-1.jpg',
        'yesterday': 'https://mmc.tirto.id/image/2017/01/03/share-pilkada-dki-timeter-2.jpg',
        'all': 'https://mmc.tirto.id/image/2017/01/03/share-pilkada-dki-timeter-3.jpg',
      }]
    }],
    'sejarahindonesia': [{
      'id': 11767,
      'parent': 0,
      'text': 'Sejarah Indonesia',
      'href': 'sejarahindonesia'
    }]
  }
}

export async function articlebyid(id) {
  let urlapi = config()['apiDetailArticle'] + id
  console.log(urlapi)
  let data = await httpcurl(urlapi)
  return (data || {}).data
}

export async function articlepartner(partner) {
  let urlapi = config()['apiPartner'] + partner + '?limit=12'
  let data = await httpcurl(urlapi, true)
  return (data || {}).data
}

export async function embedbyid(id) {
  let urlapi = config()['apiEmbed'] + id
  let data = await httpcurl(urlapi)
  return (data || {}).data
}

export async function profile(id = 0) {
  let urlapi = config()['apiDetailProfile'] + id + '?source=mongo'
  let data = await httpcurl(urlapi)
  return (data || {}).data
}

export async function metatag(url = null) {
  if (url === '/') {
    url = ''
  }
  let urlapi = config()['apiReplacer'] + url
  // console.log(urlapi)
  let data = await httpcurl(urlapi)
  return (data || {}).data
}

export async function bannerkeywordpopup(id = 0) {
  let urlapi = config()['apiPopupBannerDetail'] + "ids=" + id + '&site=desktop'
  let data = await httpcurl(urlapi)
  return (data || {}).data
}

export async function profilenewsmaker() {
  let page = Math.random(1, 50)
  let urlapi = config()['apiLatestProfile'] + 'all?fields=id,bio,namalengkap,image_url,pekerjaans&page=' + page + '&limit=1'
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function mostpopularprofile(nm = 0) {
  let urlapi = config()['apiPopularProfile']
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function listprofile(id = 'ALL', page = 1, limit = 10) {
  let urlapi = (id == 'modified') ? config()['apiLatestProfile'] + 'all?page=' + page + '&limit=' + limit + '&sortBy=latest' : config()['apiLatestProfile'] + id + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  // let result = { "total": (data.data.length) || 0, "result": (data || {}).data }
  return result
}

export async function keyword(id, page = 1, limit = 10) {
  let urlapi = config()['apiLatestKeyword'] + id + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function mostpopularrealtime(page = 1, limit = 10) {
  let urlapi = config()['apiPopularArticle'] + '?limit=' + limit + '&page=' + page
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function mostpopularkeyword(id) {
  let urlapi = config()['apiPopularKeyword'] + id
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function detailpersepsi(id) {
  let urlapi = config()['apiDetailPersepsi'] + id
  let data = await httpcurl(urlapi)
  return (data || {}).data
}

export async function listinstagram(page = 1, limit = 4) {
  let urlapi = config()['apiInstagram'] + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  return (data || {}).data
}

export async function listPopularStories() {
  let urlapi = config()['apiPopularStories']
  let data = await httpcurl(urlapi)
  return (data || {}).data
} 

export async function listpersepsi(id = 'publish', page = 1, limit = 10) {
  let urlapi = config()['apiLatestPersepsi'] + id + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function listpersepsibycategory(id = 1, page = 1, limit = 10) {
  let urlapi = config()['apiLatestPersepsiByCat'] + id + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function listsentimentheadline(page = 1, limit = 10) {
  let urlapi = config()['apiSentimentHeadline'] + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function listtopicdetailmercury(id, page, limit) {
  let urlapi = config()['apiTopicDetailMercury'] + id + '?page=' + page + '&limit=' + limit + '&source=mongo'
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function topnewsmaker() {
  let urlapi = config()['apiTopNewsmaker']
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function search(q = 'tirto', page = 1, limit = 10, type = false, bydate = 0) {
  let urlapi = config()['apiSearch'] + '?q=' + q + '&page=' + page + '&limit=' + limit  
  if (type && typeof (type) !== undefined) {
    urlapi = config()['apiSearch'] + '/' + type + '?q=' + q.replace(/ /g, '%20') + '&page=' + page + '&limit=' + limit
  }
  if (bydate && bydate === 1) {
    urlapi = urlapi + '&bydate=1'
  }
  urlapi = urlapi
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function searchGoogle(q = 'tirto', page = 1, limit = 10, type = false, bydate = 0) {
  let urlapi = config()['apiSearchGoogle'] + '?q=' + q + '&page=' + page + '&limit=' + limit
  if (type && typeof (type) !== undefined) {
    urlapi = config()['apiSearchGoogle'] + '/' + type + '?q=' + q.replace(/ /g, '%20') + '&page=' + page + '&limit=' + limit
  }
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function listtopicall(page = 1, limit = 10) {
  let urlapi = config()['apiLatestTopicAll'] + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function listinfografik(page = 1, limit = 5) {
  let urlapi = config()['apiLatestInfografik'] + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function listtopic(id, page, limit) {
  let urlapi = config()['apiLatestTopic'] + id + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function headline()
{
  let url = 'https://gold.tirto.id/1a44ef757654e3150e462af37f5150cb/embed/html/headline'
  return axios.get(url)
    .then(response => {
      if (response.status !== 200) {
        return ''
      }
      return response.data
    })
    .catch(function (error) {
      return ''
    })
}

export async function indeksarticle(kanalid, page, limit, args) {
  let urlapi = config()['apiLatestArticle'] + kanalid + '?page=' + page + '&limit=' + limit
  if (args && typeof (args) !== 'undefined') {
    urlapi = urlapi + '&' + args
  }
  // console.log(urlapi)
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function listkolumnis(page = 1, limit = 10, newlist = false) {
  let urlapi = config()['apiListKolumnis'] + page + '?limit=' + limit
  let data = await httpcurl(urlapi)
  let dataKolumnis = (data || {}).data
  let result = {}
  if (newlist) {
    let grupKolumnis = {}
    for (let key in dataKolumnis) {
      let init = key.substr(0, 1)
      if (!grupKolumnis.hasOwnProperty(init)) {
        grupKolumnis[init] = {}
      }
      grupKolumnis[init][key] = dataKolumnis[key]
    }
    result = { "total": ((data || {}).info || {}).total || 0, "result": grupKolumnis }
  } else {
    result = { "total": ((data || {}).info || {}).total || 0, "result": dataKolumnis }
  }
  return result
}

export async function articlebyidtokoh(id, page, limit) {
  let urlapi = config()['apiLatestBeritaTokoh'] + id + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": (data || {}).totalArticles || 0, "result": (data || {}).data }
  return result
}

export async function shareCount(url) {
  let urlapi = apiUri + '/share/count_api?url=' + url
  let data = await httpcurl(urlapi)
  return (data || {}).data
}

export async function authorDetail(author) {
  let urlapi = config()['apiDetailAuthor'] + author
  let data = await httpcurl(urlapi)
  let result = { "result": (data || {}).data }
  return result
}

export async function authorLatest(author, page, limit) {
  let urlapi = config()['apiLatestAuthor'] + author + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function articlekolumnis(kolumnis, page = 1, limit = 10) {
  let urlapi = config()['apiLatestKolumnis'] + kolumnis.replace(/ /g, '%20') + '?page=' + page + '&limit=' + limit
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function detailkolumnis(kolumnis) {
  let urlapi = config()['apiDetailKolumnis'] + kolumnis.replace(/ /g, '%20')
  let data = await httpcurl(urlapi)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function topicheadline() {
  let urlapi = config()['apiHeadlineTopic']
  //console.log(urlapi)
  let data = await httpcurl(urlapi)
  //console.log(data)
  let result = { "total": ((data || {}).info || {}).total || 0, "result": (data || {}).data }
  return result
}

export async function imsakiyahListKota2018() {
  let urlapi = config()['apiImsakiyah2018']
  let data = await httpcurl(urlapi)
  let result = { "result": (data || {}).data }
  return result
}

export async function jadwalImsakiyah2018(kabkota) {
  let urlapi = config()['apiJadwalImsakiyah2018'] + '?q=' + kabkota.replace(/ /g, '%20')
  let data = await httpcurl(urlapi)
  let result = (data || {}).data
  return result
}

export async function ppdb2018(nopendaftaran) {
  let apiurlprod = process.env.API_URL
  let production = (apiurlprod.includes('tirto.id')) ? '' : '/2017'
  let urlapi = config()['apiPPDB2018'] + '/' + nopendaftaran + production
  let data = await httpcurl(urlapi)
  let result = (data || {}).data
  return result
}

export async function pildun2018PlayerDetail(id) {
  let urlapi = config()['apiPildun2018PlayerDetail'] + id
  let data = await httpcurl(urlapi)
  let result = (data || {}).data
  return result
}
