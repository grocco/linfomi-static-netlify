import React from 'react';
import { withRouteData, Link } from 'react-static'
//

const l = (data, field, language) => {
    if (language === 'en') {
        return data[field]
    }
    return data[`${field}-${language}`]
}

const Member = ({member, language}) => (
    <div className="member padded" key={member.data.slug}>
        <div className="title">{l(member.data, 'title', language)}</div>
        <div className="role">{l(member.data, 'role', language)}</div>
        <div className="bio">{l(member.data, 'bio', language)}</div>
        <div className="email">{member.data.email}</div>
        <div className="board-of-directors">{member.data['board-of-directors'] ? { en: 'Board of directors', it: 'Comitato direttivo' }[language] : ''}</div>
        <img className="image" src={member.data.picture} alt="" />
    </div>
);

const MemberListItem = ({member, language, selected}) => (
    <Link to={{pathname: '/council', state: {memberSlug: member.data.slug}}} href='/council'>
        <div className={`member-list-item ${selected ? 'selected' : ''}`}>
            <div className='round member-pic' style={ {backgroundImage: `url('${member.data.picture}')`} } />
            <div className='name-and-role'>
                <div className='title'>{member.data.title}</div>
                <div className='role'>{l(member.data, 'role', language)}</div>
            </div>
        </div>
    </Link>
);

class Council extends React.Component {
    renderLeft(){
        const { members, language } = this.props;
        return (
            <div>
                <div className='row-size-text'>Current Members:</div>
                <div className="members">
                {members.filter(member => !member.data['not-anymore']).map(member => (
                    <MemberListItem  key={member.data.slug} member={member} language={language} selected={this.props.history.location.state && this.props.history.location.state.memberSlug === member.data.slug}/>
                ))}
                </div>
                <div className='row-size-text'>Old members:</div>
                <div className="members">
                {members.filter(member => member.data['not-anymore']).map(member => (
                    <div key={member.data.slug}><Link to={{pathname: '/council', state: {memberSlug: member.data.slug}}} href='/council'>{member.data.title}</Link></div>
                ))}
                </div>
            </div>
        )
    }

    renderRight() {
        const { members, language, history } = this.props;
        let member = null;
        if (! history.location.state) member = members[0]
        else member = members.find(member => member.data.slug === history.location.state.memberSlug)
        return (
            <Member key={member.slug} member={member} language={language} />
        )
    }

    render() {
        if ( this.props.side === 'left') {
            return this.renderLeft();
        }
        return this.renderRight();
    }
}

export default withRouteData(Council);