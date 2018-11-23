import React from 'react'
import { withSiteData } from 'react-static'
//
import logoImg from '../logo.png'

export default withSiteData(() => (
  <div>
    <div style={{ textAlign: 'center' }}>Welcome to</div>
    <img src={logoImg} alt="" />
  </div>
))
