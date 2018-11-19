import { connect } from 'react-redux'
import Presentational from 'components/presentational/pages/Home';

const mapStateToProps = state => ({
    language: state.ui.language || 'en',
    windowInnerWidth: state.ui.screen.width,
});

const mapDispatchToProps = dispatch => ({
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default Connected;