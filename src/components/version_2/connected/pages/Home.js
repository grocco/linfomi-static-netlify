import { connect } from 'react-redux'
import Presentational from 'components/version_2/presentational/pages/Home';

const mapStateToProps = state => ({
    language: state.ui.language || 'en',
});

const mapDispatchToProps = dispatch => ({
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default Connected;