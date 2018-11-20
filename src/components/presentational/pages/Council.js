import React from 'react';
import { withRouteData } from 'react-static'
//

const l = (data, field, language) => {
    if (language === 'en') {
        return data[field]
    }
    return data[`${field}-${language}`]
}

const Member = (member, language) => (<div className="member" key={member.data.slug}>
<div className="title">{l(member.data, 'title', language)}</div>
<div className="name-and-surname">{l(member.data, 'name-and-surname', language)}</div>
<div className="role">{l(member.data, 'role', language)}</div>
<div className="bio">{l(member.data, 'bio', language)}</div>
<div className="email">{member.data.email}</div>
<div className="board-of-directors">{member.data['board-of-directors'] ? { en: 'Board of directors', it: 'Comitato direttivo' }[language] : ''}</div>
<img className="image" src={member.data.picture} alt="" />
</div>);

export default withRouteData(({ members, language }) => (
  <div>
    <h1>The council.</h1>
    <br />
    Current Members:
    <div className="members">
      {members.filter(member => !member.data['not-anymore']).map(member => (
        <Member member={member} language={language} />
      ))}
    </div>
    Old members:
    <div className="members">
      {members.filter(member => member.data['not-anymore']).map(member => (
        <Member member={member} language={language} />
      ))}
    </div>
  </div>
))