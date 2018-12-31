import React from 'react';
import { withRouteData, Link } from 'react-static';
import i18n from 'domain/i18n';
import window from 'domain/window';

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
                <div className="image round" style={{backgroundImage: member.data.picture ? `url('${member.data.picture}/-/scale_crop/140x140/')` : "url('/assets/member-placeholder.jpg')"}} />
                <div className='member-details'>
                    <div className="board-of-directors">{member.data['board-of-directors'] ? i18n.pages.council.boardOfDirectors[language] : ''}</div>
                    <div className="title">{member.data.name} {member.data.surname}</div>
                    <div className="role">{l(member.data, 'role', language)}</div>
                    <div className='institute'>{member.data.institute}</div>
                    <div className='city'>{member.data.city}</div>
                    <a className="email" href={`mailto:${member.data.email}`}><img style={{width: 25}} src='https://www.new-soil.com/wp-content/uploads/2018/02/mail-icon.png' /></a>
                </div>
            </div>
            <div className="aside-right padded" dangerouslySetInnerHTML={{__html:l(member.data, 'bio', language)}} />
        </div>
    </div>
);

const MemberListItem = ({member, language, selected, scientificCommittee}) => {
    const inner = (
        <div className={`member-list-item ${selected ? 'selected' : ''} ${scientificCommittee || member.data['not-anymore'] ? 'simple' : ''}`}>
            <div className='round member-pic' style={ {backgroundImage: member.data.picture ? `url('${member.data.picture}/-/scale_crop/50x50/')` : "url('/assets/member-placeholder.jpg')"} } />
            <div className='name-and-role'>
                <div className="board-of-directors">{member.data['board-of-directors'] ? i18n.pages.council.boardOfDirectors[language] : ''}</div>
                <div className='title'>{member.data.name} {member.data.surname}</div>
                <div className='role'>{l(member.data, 'role', language)}</div>
                <div className='institute'>{member.data.institute}{member.data.city && `, ${member.data.city}`}</div>
            </div>
            <img className='arrow-right' src='/assets/arrow-right.png' alt='select' />
        </div>
    )
    if (scientificCommittee || member.data['not-anymore']) return inner;
    return (
    <Link to={{pathname: '/council', state: {memberSlug: member.data.slug, slave: true}}} href='/council'>
        { inner }
    </Link>
)
    };

class Council extends React.Component {
    renderLeft(){
        const l = (s) => (s[this.props.language] || s.en);
        const { members, language, scientificCommittee } = this.props;
        const council = (
            <div>
                <div className='row-size-text'>{l(i18n.pages.council.current)}:</div>
                <div className="members">
                {members
                    .filter(member => !member.data['not-anymore'])
                    .sort((el1, el2) => compareByField('order', el => el.data)(el1,el2) || compareByField('surname', el => el.data)(el1,el2))
                    .map((member, idx) => (
                    <MemberListItem  key={member.data.slug} member={member} language={language} selected={this.props.history.location.state && ( this.props.history.location.state.memberSlug === member.data.slug || (idx === 0 && this.props.history.location.state.memberSlug === 'president' ))}/>
                ))}
                </div>
                <div className='row-size-text'>{l(i18n.pages.council.previous)}:</div>
                <div className="members">
                {members
                    .filter(member => member.data['not-anymore'])
                    .sort(compareByField('surname', el => el.data))
                    .map(member => (
                    <MemberListItem  key={member.data.slug} member={member} language={language} selected={this.props.history.location.state && this.props.history.location.state.memberSlug === member.data.slug}/>
                ))}
                </div>
            </div>
        );
        const sc = (
            <div>
                <div className='row-size-text'>{l(i18n.pages.council.current)}:</div>
                <div className="members">
                {members
                    .filter(member => !member.data['not-anymore'])
                    .sort((el1, el2) => compareByField('order', el => el.data)(el1,el2) || compareByField('surname', el => el.data)(el1,el2))
                    .map((member, idx) => (
                    <MemberListItem scientificCommittee={scientificCommittee}  key={member.data.slug} member={member} language={language} selected={this.props.history.location.state && ( this.props.history.location.state.memberSlug === member.data.slug || (idx === 0 && this.props.history.location.state.memberSlug === 'president' ))}/>
                ))}
                </div>
            </div>
        );
        return scientificCommittee ? sc : council;
    }

    renderRight() {
        const { members, language, history, scientificCommittee } = this.props;
        let member = null;
        if (! history.location.state && (window.innerWidth > 1300 || scientificCommittee)) return (
            <div className='placeholder-image' style={ { backgroundImage: scientificCommittee ? 'url(\'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/4ZrVLdVKeijzurndz/hospital-profession-people-and-medicine-concept-group-of-happy-doctors-meeting-on-conference-or-medical-seminar-and-looking-to-something-at-hospital_ewt0_t3hx__F0000.png\')' : 'url("https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/GTYSdDW/group-of-happy-doctors-meeting-at-hospital-office_vk3wwzkb__F0000.png")'}} />
        );
        if( !history.location.state || history.location.state.memberSlug === 'president') member = members.sort(compareByField('order', el => el.data))[0]
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