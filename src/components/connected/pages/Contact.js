import { connect } from 'react-redux'
import Presentational from 'components/presentational/pages/Contact';

const mapStateToProps = state => ({
    language: state.ui.language
});

const mapDispatchToProps = () => ({
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default Connected;