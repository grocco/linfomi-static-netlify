import React, { Component } from "react";
import i18n from "domain/i18n";
import { withRouteData } from "react-static";
import window from "domain/window";

class Intro extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const navHeight = 101;
    const l = this.topLogo;

    if (l.parentElement.getBoundingClientRect().bottom < navHeight - 20) {
      l.style.width = `60px`;
      l.style.height = l.style.width;
      l.style.paddingRight = "20px";
    } else if (l.parentElement.getBoundingClientRect().bottom < navHeight + 220) {
      const amount = Math.min(l.parentElement.getBoundingClientRect().bottom - 20, 220);
      l.style.width = `${amount}px`;
      l.style.height = `${l.parentElement.getBoundingClientRect().bottom - 40}px`;
      l.style.paddingRight = `${240 - amount}px`;
    } else if (navHeight < l.parentElement.getBoundingClientRect().bottom) {
      l.style.width = `${Math.min(l.parentElement.getBoundingClientRect().bottom - 20, 220)}px`;
      l.style.height = `${l.parentElement.getBoundingClientRect().bottom - 40}px`;
      l.style.paddingRight = "20px";
    } else {
      l.style.width = `60px`;
      l.style.height = l.style.width;
      l.style.paddingRight = "20px";
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const l = s => s[this.props.language] || s.en;

    return (
      <div
        className="page intro-image"
        style={{
          backgroundImage: `url('/assets/images/intro-image.jpg'`
        }}
      >
        {/* http://www.linuxcmd.org/lcshow/big/0/451_red-wallpaper.png */}

        <div className="top-logo-container" ref={el => (this.topLogo = el)}>
          <img
            onClick={() =>
              !window.server && window.requestAnimationFrame(() => document.getElementById("menu1home").scrollIntoView())
            }
            src={`/assets/${l(i18n.assets.logos.foundation)}`}
            className="top-logo"
          />
        </div>
      </div>
    );
  }
}

export default withRouteData(Intro);
