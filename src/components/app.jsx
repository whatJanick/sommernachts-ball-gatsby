import React from "react"
import Classnames from "classnames"
import { createBreakpoint } from "react-use"
import { isIE, isSafari, isMobile as isTouch } from "react-device-detect"
import InstagramIcon from "@material-ui/icons/Instagram"
import easyScroll from "easy-scroll"
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined"
// import Three from "./three"
import Main from "./main"
import Navi from "./navi"
// import logoSrcB from "../assets/migros_b.svg"
import logoSrcW from "../assets/migros_w.svg"
import CookieConsent from "react-cookie-consent"
import "../styles/app.scss"
import { Script } from "gatsby"

let mainEl
const useBreakpoint = createBreakpoint({
  mobile: 767,
  other: 768,
})

const App = (props) => {
  const [wp, setWp] = React.useState(null)
  const [prevWp, setPrevWp] = React.useState(null)
  const [isIntro, setIsIntro] = React.useState(false)
  const [inverted] = React.useState(true)
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const [cookiesAccepted, setCookiesAccepted] = React.useState(false)
  const [showImprint, setShowImprint] = React.useState(false)
  const isMobile = useBreakpoint() === "mobile"

  React.useEffect(() => {
    // setInverted(wp > 2 && wp < 9)
    setMobileNavOpen(false)
    setIsIntro(wp <= 2 || wp === 9)
  }, [wp])

  React.useLayoutEffect(() => {
    mainEl = document.querySelector("main#main")
  }, [])

  function jumpTo(newWp, time) {
    const targetEl = document.querySelectorAll('[data-wp="' + newWp + '"]')[0]
    const scrollEl = mainEl
    if (time === 0) {
      setMobileNavOpen(false)
      scrollEl.scrollTo(0, targetEl.offsetTop)
      return
    }
    easyScroll({
      scrollableDomEle: scrollEl,
      direction: "bottom",
      duration: time,
      easingPreset: "easeOutQuad",
      scrollAmount: targetEl.offsetTop - scrollEl.scrollTop,
    })
  }

  function onExtraWheel(event) {
    if (isMobile || !isSafari) return
    mainEl.scrollTop += event.deltaY
  }

  const classes = Classnames({
    inverted,
    "mobile-nav-open": mobileNavOpen,
    isIE,
  })

  const showFooter = () => {
    if (isMobile) {
      return mobileNavOpen
    } else {
      return !isIntro
    }
  }

  return (
    <div id="app" className={classes}>
      {isIE ? (
        <React.Fragment>
          <h1>Ihr Browser (Internet Explorer) ist leider veraltet.</h1>
          <h2>Diese Homepage kann so nicht angezeigt werden.</h2>
          <br />
          <p>
            Bitte installieren Sie einen aktuellen Browser wie zB.{" "}
            <a href="https://www.google.com/chrome/">Google Chrome</a> oder{" "}
            <a href="https://www.mozilla.org/de/firefox/new/">Firefox</a>.
          </p>
          <p>
            Mehr Informationen darüber wieso man keine veralteten Browser
            benutzen sollte:{" "}
            <a href="https://www.browser-update.org/de/update.html">
              hier klicken
            </a>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/*<Three show={isIntro || mobileNavOpen} />*/}
          <header
            className={`text-logo front
          ${(!isIntro && !isMobile) || mobileNavOpen ? "show" : "hide"}`}
          >
            <div className="row">
              <span className="left suffix-slash">Sommer</span>
              <span className="right">20.</span>
            </div>
            <div className="row">
              <span className="left suffix-slash">Nachts</span>
              <span className="right">Juni</span>
            </div>
            <div className="row">
              <span className="left suffix-slash">Ball</span>
              <span className="right">2026</span>
            </div>
            <div className="row instagram-link">
              <a
                href="https://www.instagram.com/sommernachtsballzuerich"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="icon" />
              </a>
            </div>
          </header>
          <a
            href="https://engagement.migros.ch"
            target="_blank"
            rel="noopener noreferrer"
            className={`migros-logo migros-link blend ${
              wp < 3 || mobileNavOpen ? "show" : "hide"
            }`}
          >
            <img src={logoSrcW} alt="Migros Kulturprozent" />
          </a>
          <Main
            data={props.data}
            wp={wp}
            setWp={setWp}
            prevWp={prevWp}
            setPrevWp={setPrevWp}
            jumpTo={jumpTo}
            inverted={inverted}
            isIntro={isIntro}
            isMobile={isMobile}
            isTouch={isTouch}
            mobileNavOpen={mobileNavOpen}
            setMobileNavOpen={setMobileNavOpen}
            onExtraWheel={onExtraWheel}
          />
          <Navi
            data={props.data}
            wp={wp}
            jumpTo={jumpTo}
            isIntro={isIntro}
            isMobile={isMobile}
            mobileNavOpen={mobileNavOpen}
            onExtraWheel={onExtraWheel}
          />
          {showImprint && (
            <section className="imprint">
              <div className="imprint-inner">
                <div>
                  <p>
                    <b>Impressum</b>
                  </p>
                  <p>
                    Genossenschaft Migros Zürich
                    <br />
                    Pfingstweidstrasse 101
                    <br />
                    8005 Zürich
                  </p>
                </div>
                <div>
                  <p>
                    <b>Kontakt</b>
                  </p>
                  <p>
                    Kulturprozent Migros Zürich
                    <br />
                    Pfingstweidstrasse 101
                    <br />
                    8005 Zürich
                    <br />
                    <a href="mailto:sommer­nachts­ball@gmz.migros.ch">
                      sommer­nachts­ball@gmz.migros.ch
                    </a>
                    <br />
                    <a href="tel:+41585615460">+41 58 561 54 60</a>
                    <br />
                  </p>
                </div>
              </div>
              <CloseOutlinedIcon
                className="icon close"
                fontSize="large"
                onClick={() => setShowImprint(false)}
              />
            </section>
          )}
          <footer id="footer" className={showFooter() ? "" : "hidden"}>
            <button type="button" onClick={() => setShowImprint(true)}>
              Impressum
            </button>
            <span>/</span>
            <a href="https://www.migros.ch/de/content/rechtliche-informationen">
              Rechtliches
            </a>
            <span>/</span>
            <a href="https://privacy.migros.ch/de">Datenschutz</a>
          </footer>
          <CookieConsent
            debug={false}
            enableDeclineButton
            disableStyles
            location="none"
            buttonText="Einverstanden"
            declineButtonText="Ablehnen"
            style={{
              position: "fixed",
              left: "16px",
              bottom: "16px",
              width: "calc(100% - 32px)",
              zIndex: "100",
              backgroundColor: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2ch",
              fontSize: "16px",
              lineHeight: "24px",
              padding: "2ch",
              border: "1px solid #000000",
            }}
            disableButtonStyles
            declineButtonStyle={{
              fontFamily: "inherit",
              color: "#ffffff",
              backgroundColor: "#000000",
              border: "1px solid #000000",
              fontSize: "16px",
              padding: "1ch 2ch",
            }}
            buttonWrapperClasses="cookie-consent-button-wrapper"
            buttonStyle={{
              fontFamily: "inherit",
              color: "#ffffff",
              backgroundColor: "#000000",
              fontSize: "16px",
              border: "1px solid #000000",
              padding: "1ch 2ch",
            }}
            expires={150}
            onAccept={() => setCookiesAccepted(true)}
          >
            Erklärst Du dich einverstanden, dass wir zu statistischen Zwecken
            Cookies verwenden?
          </CookieConsent>
          {cookiesAccepted && (
            <>
              <Script src="https://www.googletagmanager.com/gtag/js?id=UA-16856648-8" />
              <Script>
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments)};
                  gtag('js', new Date());
                  gtag('config', 'UA-16856648-8', { 'anonymize_ip': true })
                `}
              </Script>
            </>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default App
