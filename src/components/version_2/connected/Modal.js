import { connect } from 'react-redux'
import Presentational from 'components/version_2/presentational/Modal';
import { hideModal, actionFunctions } from 'domain/state/actions';

const mapStateToProps = state => ({
  loading: state.ui.loading,
  language: state.ui.language
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  buttonClick: (action) => dispatch(actionFunctions[action]())
});

const Connected = connect( 
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default Connected;