import React from 'react';
import { withRouteData, Link } from 'react-static'
//

const l = (data, field, language) => {
    if (language === 'en') {
        return data[field]
    }
    return data[`${field}-${language}`]
}

// <div className='breadcrumbs' onClick={history.goBack}>{'< back'}</div>
const Member = ({member, language, history}) => (
    <div className="member padded" key={member.data.slug}>
        { history.location.state && history.location.state.slave && 
            <div className="breadcrumbs" onClick={history.goBack}>
                <img className="arrow-left" src="/assets/arrow-right.png" alt="back" />
                <div className='go-back'>BACK</div>
            </div>
        }
        <div className='aside-left'>
            <div className="image round" style={{backgroundImage: member.data.picture ? `url('${member.data.picture}/-/resize/150x/')` : "url('/assets/member-placeholder.jpg')"}} />
            <div className="title">{member.data.title}</div>
            <div className="role">{l(member.data, 'role', language)}</div>
            <div className="board-of-directors">{member.data['board-of-directors'] ? { en: 'Board of directors', it: 'Comitato direttivo' }[language] : ''}</div>
            <div className="email" onClick={()=>`mailto:${member.data.email}`} />
        </div>
        <div className="bio bubble">{l(member.data, 'bio', language)}</div>
    </div>
);

const MemberListItem = ({member, language, selected}) => (
    <Link to={{pathname: '/council', state: {memberSlug: member.data.slug, slave: true}}} href='/council'>
        <div className={`member-list-item ${selected ? 'selected' : ''}`}>
            <div className='round member-pic' style={ {backgroundImage: member.data.picture ? `url('${member.data.picture}/-/resize/50x/')` : "url('/assets/member-placeholder.jpg')"} } />
            <div className='name-and-role'>
                <div className='title'>{member.data.title}</div>
                <div className='role'>{l(member.data, 'role', language)}</div>
            </div>
            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
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
                    <div key={member.data.slug}><Link to={{pathname: '/council', state: {memberSlug: member.data.slug, slave: true}}} href='/council'>{member.data.title}</Link></div>
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
            <Member key={member.slug} member={member} language={language} history={history} />
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