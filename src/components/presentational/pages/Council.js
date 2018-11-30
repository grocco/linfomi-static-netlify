import React from 'react';
import { withRouteData, Link } from 'react-static';
import i18n from 'domain/i18n';

const l = (data, field, language) => {
    if (language === 'en') {
        return data[field]
    }
    return data[`${field}-${language}`] || data[field];
}

const compareByField = (field, accessFunction) => (a,b) => {
    if(accessFunction) {
        a = accessFunction(a);
        b = accessFunction(b);
    }
    if (a[field] === undefined || a[field] === null) return 1;
    if (b[field] === undefined || b[field] === null) return -1;
    if (a[field] < b[field])
        return -1;
    if (a[field] > b[field])
        return 1;
    return 0;
}

// <div className='breadcrumbs' onClick={history.goBack}>{'< back'}</div>
const Member = ({member, language, history}) => (
    <div className="member" key={member.data.slug}>
        { history.location.state && history.location.state.slave && 
            <div className="breadcrumbs" onClick={history.goBack}>
                <img className="arrow-left" src="/assets/arrow-right.png" alt="back" />
                <div className='go-back'>{i18n.navigation.back[language] || "BACK"}</div>
            </div>
        }
        <div className='content'>
            <div className='aside-left'>
                <div className="image round" style={{backgroundImage: member.data.picture ? `url('${member.data.picture}/-/resize/150x/')` : "url('/assets/member-placeholder.jpg')"}} />
                <div className='member-details'>
                    <div className="board-of-directors">{member.data['board-of-directors'] ? i18n.pages.council.boardOfDirectors[language] : ''}</div>
                    <div className="title">{member.data.title}</div>
                    <div className="role">{l(member.data, 'role', language)}</div>
                    <div className="email" onClick={()=>`mailto:${member.data.email}`} />
                </div>
            </div>
            <div className="aside-right padded" dangerouslySetInnerHTML={{__html:l(member.data, 'bio', language)}} />
        </div>
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
        const l = (s) => (s[this.props.language] || s.en);
        const { members, language } = this.props;
        return (
            <div>
                <div className='row-size-text'>{l(i18n.pages.council.current)}:</div>
                <div className="members">
                {members
                    .filter(member => !member.data['not-anymore'])
                    .sort(compareByField('order', el => el.data))
                    .map((member, idx) => (
                    <MemberListItem  key={member.data.slug} member={member} language={language} selected={this.props.history.location.state && ( this.props.history.location.state.memberSlug === member.data.slug || (idx === 0 && this.props.history.location.state.memberSlug === 'president' ))}/>
                ))}
                </div>
                <div className='row-size-text'>{l(i18n.pages.council.previous)}:</div>
                <div className="members">
                {members
                    .filter(member => member.data['not-anymore'])
                    .sort(compareByField('role', el => el.data))
                    .map(member => (
                    <MemberListItem  key={member.data.slug} member={member} language={language} selected={this.props.history.location.state && this.props.history.location.state.memberSlug === member.data.slug}/>
                ))}
                </div>
            </div>
        )
    }

    renderRight() {
        const { members, language, history } = this.props;
        let member = null;
        if (! history.location.state || history.location.state.memberSlug === 'president') member = members.sort(compareByField('order', el => el.data))[0]
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