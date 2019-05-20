import { connect } from 'react-redux'
import Presentational from 'components/version_2/presentational/pages/Intro';

const mapStateToProps = state => ({
    language: state.ui.language || 'en',
});

const mapDispatchToProps = () => ({
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default Connected;