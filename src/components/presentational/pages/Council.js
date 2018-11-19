import React from 'react';
import { withRouteData } from 'react-static'
//

const l = (data, field, language) => {
    if (language === 'en') {
        return data[field]
    }
    return data[`${field}-${language}`]
}

export default withRouteData(({ members, language }) => (
  <div>
    <h1>The council.</h1>
    <br />
    All Members:
    <ul>
      {members.map(member => (
        <li key={member.data.slug}>
            <p>{l(member.data, 'title', language)}</p>
            <p>{l(member.data, 'bio', language)}</p>
            <img className="image" src={member.data.picture} alt="" />
        </li>
      ))}
    </ul>
  </div>
))