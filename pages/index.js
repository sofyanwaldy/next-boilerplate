import React from 'react'
import Head from 'next/head'

const Home = () => (
  <div>
    <Head>
      <title>Tirto.ID</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="keywords" content="g30s pki, gerakan 30 september, cakrabirawa, lubang buaya, g30s, prajurit tni, humaniora, mild report" />
    </Head>
      <section className="box box_gradient pd5 full">
        <div className="list lined pd15">
          <div className="title_box2">
            <a href="https://tirto.id/q/current-issue-hPZ" className="fr more">
              <i className="icon icon-right"></i>
            </a>
            <span>Current Issue</span>
          </div>
          <article>
            <a href="https://tirto.id/saat-pelecehan-seksual-terjadi-dalam-demonstrasi-ei6a">
              Saat Pelecehan Seksual Terjadi dalam Demonstrasi          
              <span className="hashtag">#demomahasiswa</span>
            </a>
          </article>
          <article>
            <a href="https://tirto.id/babak-baru-kasus-blbi-setelah-hakim-syamsul-terbukti-melanggar-etik-ei4o">
              Babak Baru Kasus BLBI Setelah Hakim Syamsul Terbukti Melanggar Etik          
            <span className="hashtag">#kasusblbi</span>
            </a>  
          </article>
          <article>
            <a href="https://tirto.id/kesaksian-demonstran-saat-polisi-hujani-gas-air-mata-ke-atma-jaya-ei4U">
              Kesaksian Demonstran saat Polisi 'Hujani' Gas Air Mata ke Atma Jaya <span className="hashtag">#demomahasiswa</span>
            </a>    
          </article>
        </div>
      </section>
      <style jsx>{`
        .box.box_gradient {
          background: #00CCD7;
          background: -moz-linear-gradient(left,#00ccd7 0,#51a9f9 100%);
          background: -webkit-linear-gradient(left,#00ccd7 0,#51a9f9 100%);
          background: linear-gradient(to right,#00ccd7 0,#51a9f9 100%);
        }
        .box.box_gradient .list {
          background: #fff;
        }
        .pd15 {
          padding: 15px;
        }
        .title_box2 {
          font-family: montserrat-bold;
          font-size: 18px;
          margin-bottom: 20px;
          border-bottom: 1px solid #dedede;
        }
        .list.lined>a, .list.lined>article {
          border-bottom: 1px solid #F0F0F0;
          margin: 0 0 8px;
          padding: 0 0 8px;
        }
        .list>a, .list>article {
          position: relative;
          padding-top: 0;
          padding-bottom: 5px;
      }
      `}

      </style>
    </div>
)

export default Home
