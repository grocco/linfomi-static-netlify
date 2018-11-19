import { connect } from 'react-redux'
import Presentational from 'components/presentational/pages/Council';

const mapStateToProps = state => ({
    language: state.ui.language
});

const mapDispatchToProps = dispatch => ({
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default Connected;