import React, { Component } from 'react';
import i18n from 'domain/i18n';
import { Row, Col } from 'react-grid-system';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            more: false
        };
    }

    render() {
        const l = (s) => (s[this.props.language] || s['en']);
        return (
            <div className='page-home'>
                {/* <p>{l(i18n.pages.home.content.thanks)}</p>
                <p>{l(i18n.pages.home.content.realities.introduction)}</p> */}

                    <Row>
                        <Col style={this.state.more ? {} : {transitionDelay: '1s'}} className={'card'} sm={this.state.more ? 6 : 12} lg={this.state.more ? this.props.windowInnerWidth > 1200 ? 3 : 4 : 12} >
                            <div className={'card-title'} >
                                <h1 className={'card-h2'}>{l(i18n.pages.home.content.realities.fior.acronym)}</h1>
                                <h3 className={'card-h3'}>{l(i18n.pages.home.content.realities.fior.title)}</h3>
                            </div>
                            <p>{l(i18n.pages.home.content.thanks)}</p>
                            <p>{l(i18n.pages.home.content.realities.introduction)}</p>
                            <ol>
                                <li>{l(i18n.pages.home.content.realities.ior.title)}</li>
                                <li>{l(i18n.pages.home.content.realities.ielsg.title)}</li>
                                <li>{l(i18n.pages.home.content.realities.icml.title)}</li>
                            </ol>
                            <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.finalThoughts) }} />
                            <p>{l(i18n.pages.home.content.signature.name)}
                                <br/>
                                {l(i18n.pages.home.content.signature.description)}
                            </p>
                            <div onClick={()=>this.setState({more: !this.state.more})}>TELL ME MORE {this.state.more ? 'yes' : 'no'}</div>
                        </Col>
                        <Col style={this.state.more ? {transitionDelay: '1s'} : {}} className={this.state.more ? 'card' : 'card hidden'} sm={6} lg={this.props.windowInnerWidth > 1200 ? 3 : 4} >
                            <div className={'card-title'} >
                                <h1 className={'card-h2'}>{l(i18n.pages.home.content.realities.ior.acronym)}</h1>
                                <h3 className={'card-h3'}>{l(i18n.pages.home.content.realities.ior.title)}</h3>
                            </div>
                            <div>
                                <img className={'card-img-wrap-left'} width={'100%'} src={'/assets/IOR_logo.gif'} />
                                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ior.description) }} />
                            </div>
                        </Col>
                        <Col style={this.state.more ? {transitionDelay: '2s'} : {}} className={this.state.more ? 'card' : 'card hidden'} sm={6} lg={this.props.windowInnerWidth > 1200 ? 3 : 4}>
                            <div className={'card-title'} >
                                <h1 className={'card-h2'}>{l(i18n.pages.home.content.realities.ielsg.acronym)}</h1>
                                <h3 className={'card-h3'}>{l(i18n.pages.home.content.realities.ielsg.title)}</h3>
                            </div>                            
                            <div>
                                <img className={'card-img-wrap-left'} width={'100'} src={'/assets/ielsg.jpg'} />
                                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.ielsg.description) }} />
                            </div>
                        </Col>
                        <Col style={this.state.more ? {transitionDelay: '3s'} : {}} className={this.state.more ? 'card' : 'card hidden'} sm={6} lg={this.props.windowInnerWidth > 1200 ? 3 : 4}>
                            <div className={'card-title'} >
                                <h1 className={'card-h2'}>{l(i18n.pages.home.content.realities.icml.acronym)}</h1>
                                <h3 className={'card-h3'}>{l(i18n.pages.home.content.realities.icml.title)}</h3>
                            </div>                            
                            <div>
                                <img className={'card-img-wrap-left'} width={'100'} src={'/assets/icml_logo.png'} />
                                <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.realities.icml.description) }} />
                            </div>
                        </Col>
                    </Row>
                {/* <p dangerouslySetInnerHTML={{ __html: l(i18n.pages.home.content.finalThoughts) }} />
                <p>{l(i18n.pages.home.content.signature.name)}
                    <br/>
                    {l(i18n.pages.home.content.signature.description)}
                </p>                 */}
            </div>
        )
    }

}