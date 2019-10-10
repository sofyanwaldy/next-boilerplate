import React from 'react'
// import Head from 'next/head'
import { Link } from '../routes'
// import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <section className="box box_gradient pd5 full">
        <div className="list lined pd15">
          {/* test */}
          <div className="title_box2">
            <Link href="q/current-issue-hPZ">
              <>
                <a className="fr more"><i className="icon icon-right"></i></a>
                <span>Current Issue</span>
              </>
            </Link>
          </div>
          <article>
            <Link route="/upaya-pa-212-di-kasus-ninoy-aduan-ke-tuhan-hingga-ratusan-advokat-ejve">
              <a>
                Upaya PA 212 di Kasus Ninoy: Aduan ke Tuhan Hingga Ratusan Advokat<span className="hashtag">#kasusninoykarundeng</span>
              </a>
            </Link>
          </article>
          <article>
            <Link route="/akademi-sepakbola-chelsea-dulu-didesak-tutup-kini-jadi-kebanggaan-ejtM">
              <a>
                Akademi Sepakbola Chelsea: Dulu Didesak Tutup, Kini Jadi Kebanggaan <span className="hashtag">#ligainggris</span>
              </a>
            </Link>

          </article>
          <article>
            <Link route="/efek-kekerasan-aparat-terhadap-demonstran-usia-anak-fisik-psikis-ejrr">
              <a>
                Efek Kekerasan Aparat terhadap Demonstran Usia Anak: Fisik &amp; Psikis <span className="hashtag">#demopelajar</span>
              </a>
            </Link>
          </article>
        </div>
      </section>
      <style jsx>{`
        *, :after, :before {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        section {
          display: block;
        }
        .box {
          position: relative;
        }
        .box.box_gradient {
          background: #00CCD7;
          background: -moz-linear-gradient(left,#00ccd7 0,#51a9f9 100%);
          background: -webkit-linear-gradient(left,#00ccd7 0,#51a9f9 100%);
          background: linear-gradient(to right,#00ccd7 0,#51a9f9 100%);
        }
        .full {
          margin-left: -10px;
          margin-right: -10px;
        }
        .box.box_gradient .list {
          background: #fff;
        }
        .pd15 {
          padding: 15px;
        }
        .pd5 {
          padding: 5px
        }
        .title_box2 {
          font-family: montserrat-bold;
          font-size: 18px;
          margin-bottom: 20px;
          border-bottom: 1px solid #dedede;
          color: #0097DD;
        }
        .box.box_gradient .list {
          background: #fff;
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
}

export default Home
