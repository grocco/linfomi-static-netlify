import { connect } from 'react-redux'
import Presentational from 'components/version_2/presentational/pages/Council';
import { withSiteData } from 'react-static';

const mapStateToProps = state => ({
    language: state.ui.language
});

const mapDispatchToProps = dispatch => ({
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default withSiteData(Connected);