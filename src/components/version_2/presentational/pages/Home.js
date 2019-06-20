import React, { Component } from "react";
import i18n from "domain/i18n";
import { Link } from "react-static";
import assets from "domain/assets";
import window from "domain/window";

export default class Home extends Component {
  // componentDidUpdate() {
  //     if(document.getElementById('current') !== null) {
  //         window.requestAnimationFrame(()=>{
  //             window.requestAnimationFrame(()=>document.getElementById('current').scrollIntoView())
  //         })
  //     }
  // }

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.cleanAnimations = this.cleanAnimations.bind(this);
    this.setupAnimations = this.setupAnimations.bind(this);
  }

  componentDidMount() {
    this.setupAnimations();
    window.addEventListener("resize", () => {
      this.cleanAnimations();
      this.setupAnimations();
    });
  }

  componentWillUnmount() {
    this.cleanAnimations();
  }

  setupAnimations() {
    if (window) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  cleanAnimations() {
    if (window) {
      if (this.presidentCard) {
        const l = this.presidentCard;
        l.style.position = "relative";
        l.style.top = "0px";
      }
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  handleScroll() {
    if (window.innerWidth > 1063) {
      const navHeight = 101;
      if (this.presidentCard) {
        const l = this.presidentCard;
        if (navHeight + 20 + l.clientHeight >= l.parentElement.parentElement.getBoundingClientRect().bottom) {
          l.style.position = "absolute";
          l.style.bottom = "0px";
          l.style.top = null;
        } else if (l.parentElement.getBoundingClientRect().top > navHeight + 20) {
          l.style.position = "relative";
          l.style.top = "0px";
        } else if (l.parentElement.getBoundingClientRect().top <= navHeight + 20) {
          l.style.position = "fixed";
          l.style.top = `${navHeight + 20}px`;
          l.style.bottom = null;
        } else {
          l.style.position = "fixed";
          l.style.top = `${navHeight + 20}px`;
          l.style.bottom = null;
        }
      }
    }

    // if (this.realityDescription) {
    //     const l = this.realityDescription;
    //     if(l.parentElement.getBoundingClientRect().top > navHeight + 20) {
    //         l.style.position = 'relative';
    //         l.style.top = '0px';
    //     }
    //     else if(l.parentElement.getBoundingClientRect().top <= navHeight + 20  ) {
    //         l.style.position = 'fixed';
    //         const spaceLeft = l.parentElement.getBoundingClientRect().bottom - (navHeight + 20);
    //         const scrollAmount = l.clientHeight * (spaceLeft/l.parentElement.clientHeight);
    //         l.style.top = `${Math.min(-l.clientHeight + (navHeight + spaceLeft + 20 + 20) ,navHeight + 20 - (l.clientHeight - scrollAmount))}px`;
    //         l.style.bottom = null;
    //     }
    // }
  }

  renderIntro() {
    const l = s => s[this.props.language] || s.en;
    const history = (
      <div>
        {/* <div className='aside-left'>
                    <div className="image " style={{backgroundImage: `url('/assets/${l(i18n.assets.logos.foundation)}')` }} />
                    <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.fior.address) }} />
                </div> */}
        {/* <div className='aside-right'> */}

        {/* <img className='article-top-image' src="https://ucarecdn.com/380d5fcf-b56d-40d7-bd43-57397f05994d/temporary.jpg" />  */}

        <div className="history" dangerouslySetInnerHTML={{ __html: l(i18n.pages.history.content) }} />
        {/* </div> */}
      </div>
    );
    return (
      <div style={{ position: "relative" }}>
        {this.props.current && <div id="current">current</div>}
        <div className="row-size-text">
          <span>{l(i18n.pages.home.content.realities.fior.title)}</span>
        </div>
        <div className="page page-home page-columns">
          {/* <Link to={{pathname:'/home/', state: { reality: 'history'}}} href='/home'>
                        <div >
                            <div >{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                            <div >{l(i18n.pages.home.content.realities.fior.title)}</div>
                        </div>
                    </Link> */}
          <div className="aside-left">
            <div className="president-card">
              <div ref={el => (this.presidentCard = el)} className="president-card-inner">
                <div
                  onClick={() =>
                    this.props.history.replace(`/council`).then(() => {
                      {
                        /* window.requestAnimationFrame(()=>{ */
                      }
                      !window.server &&
                        window.requestAnimationFrame(() => document.getElementById("current").scrollIntoView());
                      {
                        /* })  */
                      }
                    })
                  }
                >
                  <div
                    className="smoothed-corners-pic"
                    id="president-pic"
                    style={{
                      backgroundImage: `url('https://ucarecdn.com/4dece25b-6ccd-45c2-8edd-0689eb017984/-/crop/2763x2736/0,431/-/preview//-/scale_crop/220x220/')`
                    }}
                  />
                </div>
                <div
                  className="bubble"
                  onClick={() =>
                    this.props.history.replace(`/council`).then(() => {
                      {
                        /* window.requestAnimationFrame(()=>{ */
                      }
                      !window.server &&
                        window.requestAnimationFrame(() => document.getElementById("current").scrollIntoView());
                      {
                        /* })  */
                      }
                    })
                  }
                >
                  <img id="president-signature" src="/assets/signature-cavalli.png" alt="signature" />
                  <div>
                    {l(i18n.pages.home.content.signature.name)}
                    <br />
                    <br />
                    {l(i18n.pages.home.content.signature.description)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="aside-center padded bubble-text snap-right">
            {/* <div className='home-intro'>
                            
                            <div className='title'>{l(i18n.pages.home.content.realities.fior.title)}</div>
                            <div className='image' style={{backgroundImage: `url('/assets/${l(i18n.assets.logos.foundation)}')`}}/>
                        </div> */}
            <div className="thanks-and-introduction">
              <div>{l(i18n.pages.home.content.thanks)}</div>
              <div className="mt-480">
                <br />
                {l(i18n.pages.home.content.realities.introduction)}
              </div>
            </div>
            <div style={{ clear: "left" }} />

            <div className="realities">
              {/* <Link to={{pathname:'/home/', state: { reality: 'history', slave: true}}} href='/home'>
                                <div className={`reality-list-item ${this.props.location.state && this.props.location.state.reality === 'history' ? 'selected' : ''}`}>
                                    <div className='acronym'>{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                                    <div className='title'>{l(i18n.pages.home.content.realities.fior.title)}</div>
                                    <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                                </div>
                            </Link> */}
              <div
                onClick={() =>
                  this.props.history.replace("/ior", { reality: "ior" }).then(() => {
                    {
                      /* window.requestAnimationFrame(()=>{ */
                    }
                    !window.server &&
                      window.requestAnimationFrame(() => document.getElementById("current").scrollIntoView());
                    {
                      /* })  */
                    }
                  })
                }
              >
                {" "}
                <div
                  className={`reality-list-item ${
                    this.props.location.state && this.props.location.state.reality === "ior" ? "selected" : ""
                  }`}
                >
                  <div className="acronym">
                    <div className="enumeration">1.</div> {l(i18n.pages.home.content.realities.ior.acronym)}
                  </div>
                  <div className="title">{l(i18n.pages.home.content.realities.ior.title)}</div>
                  {/* <img className='arrow-right' src='/assets/arrow-right.png' alt='select' /> */}
                </div>
              </div>
              <div
                onClick={() =>
                  this.props.history.replace("/ielsg", { reality: "ielsg" }).then(() => {
                    {
                      /* window.requestAnimationFrame(()=>{ */
                    }
                    !window.server &&
                      window.requestAnimationFrame(() => document.getElementById("current").scrollIntoView());
                    {
                      /* })  */
                    }
                  })
                }
              >
                {" "}
                <div
                  className={`reality-list-item ${
                    this.props.location.state && this.props.location.state.reality === "ielsg" ? "selected" : ""
                  }`}
                >
                  <div className="acronym">
                    <div className="enumeration">2.</div> {l(i18n.pages.home.content.realities.ielsg.acronym)}
                  </div>
                  <div className="title">{l(i18n.pages.home.content.realities.ielsg.title)}</div>
                  {/* <img className='arrow-right' src='/assets/arrow-right.png' alt='select' /> */}
                </div>
              </div>
              <div
                onClick={() =>
                  this.props.history.replace("/icml", { reality: "icml" }).then(() => {
                    {
                      /* window.requestAnimationFrame(()=>{ */
                    }
                    !window.server &&
                      window.requestAnimationFrame(() => document.getElementById("current").scrollIntoView());
                    {
                      /* })  */
                    }
                  })
                }
              >
                {" "}
                <div
                  className={`reality-list-item ${
                    this.props.location.state && this.props.location.state.reality === "icml" ? "selected" : ""
                  }`}
                >
                  <div className="acronym">
                    <div className="enumeration">3.</div> {l(i18n.pages.home.content.realities.icml.acronym)}
                  </div>
                  <div className="title">{l(i18n.pages.home.content.realities.icml.title)}</div>
                  {/* <img className='arrow-right' src='/assets/arrow-right.png' alt='select' /> */}
                </div>
              </div>
              {/* <Link to={{pathname:'/home/', state: { reality: 'history', slave: true}}} href='/home'>
                                <div className={`reality-list-item ${this.props.location.state && this.props.location.state.reality === 'history' ? 'selected' : ''}`}>
                                    <div className='acronym'>{l(i18n.pages.home.content.realities.fior.acronym)}</div>
                                    <div className='title'>{l(i18n.pages.home.content.realities.fior.title)}</div>
                                    <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                                </div>
                            </Link> */}
            </div>
            {history}
            <div className="bubble" dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.finalThoughts) }} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const l = s => s[this.props.language] || s.en;
    const renderReality = realityId => (
      <div key={realityId} className="page content">
        {this.props.current && this.props.location.state && this.props.location.state.reality === realityId && (
          <div id="current">current</div>
        )}

        <div className="aside-left">
          {assets[realityId].slice(0, Math.ceil(assets[realityId].length / 2)).map((image, idx) => (
            <div key={image + idx} className="image " style={{ backgroundImage: `url('${image}')` }} />
          ))}
          {/* <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.address) }} /> */}
        </div>

        <div className="aside-center with-title">
          <div ref={el => (this.realityDescription = el)} className="reality-description">
            <a target="__blank" href={l(i18n.header.buttons["link_" + realityId].address)}>
              <div className="title">
                <div
                  className="image "
                  style={{
                    width: realityId === "ior" ? 200 : null,
                    backgroundImage: `url('/assets/${l(i18n.assets.logos[realityId])}')`
                  }}
                />
                {/* <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities[realityId].address) }} /> */}
              </div>
            </a>
            <div className="reality-website">
              <div>{l(i18n.officialWebsite)}</div>
              <span>
                <a target="__blank" href={l(i18n.header.buttons["link_" + realityId].address)}>
                  {l(i18n.header.buttons["link_" + realityId].humanAddress)}
                </a>
              </span>
            </div>
            <div
              className="padded bubble-text"
              dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities[realityId].description) }}
            />
            {realityId === "icml" && (
              <img src={"https://ucarecdn.com/883b1339-5d6c-4727-8a1c-d950eea180d4/-/resize/434x/"} />
            )}
            {realityId === "ior" && (
              <img
                src={`https://ucarecdn.com/6231b3af-07d7-4b83-bae5-05dbbe08790a/-/resize/${Math.min(
                  1000,
                  window.innerWidth - 2
                )}x/`}
              />
            )}
          </div>
        </div>

        <div className="aside-right">
          {assets[realityId]
            .slice(Math.ceil(assets[realityId].length / 2), assets[realityId].length)
            .map((image, idx) => (
              <div key={image + idx} className="image " style={{ backgroundImage: `url('${image}')` }} />
            ))}
          {/* <a className={'external-link'} href='http://www.ior.iosi.ch/' target='__blank'>
                        <div className='name'>{l(i18n.pages.home.officialWebsite)}</div>
                        <div className='title'>{l(i18n.pages.home.content.realities.ior.title)}</div>
                        <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
                    </a> */}
        </div>
      </div>
    );
    const ielsg = (
      <div key="ielsg" className="page">
        <div className="content ielsg">
          {this.props.current && this.props.location.state && this.props.location.state.reality === "ielsg" && (
            <div id="current">current</div>
          )}

          <div className="aside-left">
            <div className="image " style={{ height: 308, backgroundImage: `url('${assets.ielsg[0]}')` }} />
            {/* <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.address) }} /> */}
          </div>

          <div className="aside-center with-title">
            <div className="reality-description">
              <a target="__blank" href={l(i18n.header.buttons.link_ielsg.address)}>
                <div className="title">
                  <div className="image " style={{ backgroundImage: `url('/assets/${l(i18n.assets.logos.ielsg)}')` }} />
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.address) }}
                  />
                </div>
              </a>
              <div className="reality-website">
                <div>{l(i18n.officialWebsite)}</div>
                <span>
                  <a target="__blank" href={l(i18n.header.buttons.link_ielsg.address)}>
                    {l(i18n.header.buttons.link_ielsg.humanAddress)}
                  </a>
                </span>
              </div>
              <div
                className="padded bubble-text"
                dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description.first) }}
              />
            </div>
          </div>
        </div>

        <div
          className="padded bubble-text"
          dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description.second) }}
        />
        <img
          style={{ marginTop: 20, borderRadius: 4 }}
          src={"https://ucarecdn.com/cf565a57-7dac-4fd3-a365-29738034afec/-/resize/1000x/"}
        />
      </div>
    );
    const icml = (
      <div key="icml" className="page">
        <div className="content ielsg">
          {this.props.current && this.props.location.state && this.props.location.state.reality === "icml" && (
            <div id="current">current</div>
          )}

          <div className="aside-center with-title">
            <a target="__blank" href={l(i18n.header.buttons.link_icml.address)}>
              <div className="title">
                <div className="image " style={{ backgroundImage: `url('/assets/${l(i18n.assets.logos.icml)}')` }} />
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.address) }}
                />
              </div>
            </a>
            <div className="reality-website">
              <div>{l(i18n.officialWebsite)}</div>
              <span>
                <a target="__blank" href={l(i18n.header.buttons.link_icml.address)}>
                  {l(i18n.header.buttons.link_icml.humanAddress)}
                </a>
              </span>
            </div>
            <div
              className="padded bubble-text"
              dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.description) }}
            />
          </div>
          <div className="aside-right">
            <div className="image " style={{ height: 478, width: 409, backgroundImage: `url('${assets.icml[0]}')` }} />
            {/* <div className='description' dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.address) }} /> */}
          </div>
        </div>

        <img
          style={{ borderRadius: 4 }}
          src={"https://ucarecdn.com/883b1339-5d6c-4727-8a1c-d950eea180d4/-/resize/1000x/"}
        />
      </div>
    );

    const intro = (
      <div
        className="placeholder-image"
        style={{
          height: "calc(100vh - 81px)",
          backgroundImage: "url('http://media.ticinotopten.ch/Castelgrande-30037-full-HD.jpg')"
        }}
      >
        <div
          style={{
            backgroundImage: `url('/assets/${l(i18n.assets.logos.foundation)}')`,
            width: 180,
            height: 180,
            backgroundSize: "cover"
          }}
        />
      </div>
    );
    {
      /* if ( ! this.props.location.state ) return this.renderIntro(); */
    }
    switch (this.props.reality) {
      case "ielsg":
        return ielsg;
      case "icml":
        return icml;
      case "ior":
        return renderReality(this.props.reality);
      default:
        return this.renderIntro();
    }
  }
}
