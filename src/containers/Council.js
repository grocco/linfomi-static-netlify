import React from 'react'
import { withRouteData } from 'react-static'
//

export default withRouteData(({ members }) => (
  <div>
    <h1>The council.</h1>
    <br />
    All Members:
    <ul>
      {members.map(member => (
        <li key={member.data.slug}>
            <p>{member.data.title}</p>
            <p>{member.data.bio}</p>
            <img className="image" src={member.data.picture} alt="" />
        </li>
      ))}
    </ul>
  </div>
))
