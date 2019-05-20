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
                    <div className="title">{member.data.surname} {member.data.name}</div>
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

// onClick={()=> history.replace('/council', {memberSlug: member.data.slug}).then(()=> {
//     {/* window.requestAnimationFrame(()=>{ */}
//         window.requestAnimationFrame(()=>document.getElementById('current').scrollIntoView())
//     {/* })  */}
//     })}

class MemberListItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const navHeight = 101;
        const l = this.lift;
        if(l.parentElement.parentElement.getBoundingClientRect().bottom - 20 <= navHeight + l.clientHeight ) {
            l.style.position = 'fixed';
            l.style.top = `${l.parentElement.parentElement.getBoundingClientRect().bottom - l.clientHeight}px`;
        } else  if(navHeight >= l.parentElement.parentElement.getBoundingClientRect().top) {
            l.style.position = 'fixed';
            l.style.top = `${navHeight + 20}px`;
        } else {
            l.style.position = 'relative';
            l.style.top = '0px';
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const {member, language, selected, scientificCommittee, history} = this.props;
        
        const inner = (
            <div 
                
                className={`member-list-item ${selected ? 'selected' : ''} ${scientificCommittee || member.data['not-anymore'] ? 'simple' : ''}`} 
                 
                        >
                <div className='pic-name-role'>
                    <div ref={(el)=>this.lift=el} className='lift-container'>
                        <div className='round member-pic' style={ {backgroundImage: member.data.picture ? `url('${member.data.picture}/-/scale_crop/60x60/')` : "url('/assets/member-placeholder.jpg')"} } />
                        <div className='name-and-role'>
                            <div className='title'>{member.data.surname} {member.data.name}</div>
                            <div className="board-of-directors">{member.data['board-of-directors'] ? i18n.pages.council.boardOfDirectors[language] : ''}</div>
                            <div className='role'>{l(member.data, 'role', language)}</div>
                            <div className='institute'>{member.data.institute}{member.data.city && `, ${member.data.city}`}</div>
                            <a className="email" href={`mailto:${member.data.email}`}><img src='https://www.new-soil.com/wp-content/uploads/2018/02/mail-icon.png' /></a>

                        </div>
                    </div>
                </div>
                <div className='short-description' dangerouslySetInnerHTML={{__html:l(member.data, 'bio', language)}} />
                {/* <div onClick={()=>this.setState({expanded:!this.state.expanded})} className='expand' >
                <svg className={`expand-arrow ${this.state.expanded ? 'expanded' : 'closed'}`} height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <g>
                        <path stroke="#000" d="M50 70 L10 30 L90 30 Z">
                        </path>
                        <path d="">
                        </path>
                    </g>
                </svg>               
                </div> */}
            </div>
        )
        if (scientificCommittee || member.data['not-anymore']) return inner;
        return inner;
    }
}

class Council extends React.Component {

    // componentDidUpdate() {
    //     if(document.getElementById('current') !== null) {
    //         window.requestAnimationFrame(()=>{
    //             window.requestAnimationFrame(()=>document.getElementById('current').scrollIntoView())
    //         })   
    //     }
    // }

    lifts=[];
    

    renderList(){
        const _l = (s) => (s[this.props.language] || s.en);
        const { members, language, scientificCommittee, scMembers } = this.props;
        const council = (
            <div>
                <div className='row-size-text'>{_l(i18n.pages.council.current)}</div>
                <div className="members">
                {members && members
                    .filter(member => !member.data['not-anymore'])
                    .sort((el1, el2) => compareByField('order', el => el.data)(el1,el2) || compareByField('surname', el => el.data)(el1,el2))
                    .map((member, idx) => (
                    <MemberListItem history={this.props.history}  key={member.data.slug} member={member} language={language} selected={this.props.history.location.state && ( this.props.history.location.state.memberSlug === member.data.slug || (idx === 0 && this.props.history.location.state.memberSlug === 'president' ))}/>
                ))}
                </div>
                <div className='other-members'> 
                    <div className="members" style={ {flex: 2}}>
                    <div className='row-size-text'>{_l(i18n.pages.council.previous)}</div>
                    {members && members
                        .filter(member => member.data['not-anymore'])
                        .sort(compareByField('surname', el => el.data))
                        .map(member => (
                        <div className='past-member'  key={member.data.slug}>
                            <span>{member.data.surname} {member.data.name}</span>                       
                            <span>{l(member.data, 'role', language)}</span>
                        </div>
                    ))}
                    </div>
                    <div className="members" style={ {flex: 3}}>
                    <div className='row-size-text'>{_l(i18n.pages.council.scientific)}</div>
                    {scMembers && scMembers
                        .sort(compareByField('surname', el => el.data))
                        .map(member => (
                        <div className='scientific-council-member'  key={member.data.slug}>
                            <span >{member.data.surname} {member.data.name} {l(member.data, 'role', language) && `(${l(member.data, 'role', language)})`}</span>                       
                            <span>{member.data.institute}{member.data.city && `, ${member.data.city}`}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        );
        const sc = (
            <div>
                <div className='row-size-text'>{l(i18n.pages.council.current)}</div>
                <div className="members">
                {members && members
                    .filter(member => !member.data['not-anymore'])
                    .sort((el1, el2) => compareByField('order', el => el.data)(el1,el2) || compareByField('surname', el => el.data)(el1,el2))
                    .map((member, idx) => (
                    <MemberListItem history={this.props.history} scientificCommittee={scientificCommittee}  key={member.data.slug} member={member} language={language} selected={this.props.history.location.state && ( this.props.history.location.state.memberSlug === member.data.slug || (idx === 0 && this.props.history.location.state.memberSlug === 'president' ))}/>
                ))}
                </div>
            </div>
        );
        return scientificCommittee ? sc : council;
    }

    render() {
        const { members, language, history, scMembers } = this.props;
        let member = null;
        if( history.location.state && history.location.state.memberSlug === 'president') member = members.sort(compareByField('order', el => el.data))[0]
        else member = members.find(member => history.location.state && member.data.slug === history.location.state.memberSlug)
        return (
            <div className='page masterSlave'>
                {this.props.current && <div id='current'>current</div>}
                <div className='left'>
                    { this.renderList() }
                </div>
                {/* <div className='right'>
                    { member && <Member key={member.slug} member={member} language={language} history={history} /> }
                </div> */}
            </div>
        )
        // if (! history.location.state && (window.innerWidth > 1300 || scientificCommittee)) return (
        //     <div className='placeholder-image' style={ { backgroundImage: scientificCommittee ? 'url("https://ucarecdn.com/2c429942-1df9-4663-8458-75f5d10506b8/test1.jpg")' : 'url("https://ucarecdn.com/2c429942-1df9-4663-8458-75f5d10506b8/test1.jpg")'}} />
        // );
        // if (!history.location.state || !history.location.state.memberSlug) return this.renderList();
        // if( history.location.state.memberSlug === 'president') member = members.sort(compareByField('order', el => el.data))[0]
        // else member = members.find(member => member.data.slug === history.location.state.memberSlug)
        // return ( 
        //     <div>
        //     {this.props.current && <div id='current'>current</div>}
        //         <Member key={member.slug} member={member} language={language} history={history} />
        //     </div>
        // )
    }

}

export default withRouteData(Council);
