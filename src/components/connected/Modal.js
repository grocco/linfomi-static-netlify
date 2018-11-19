import { connect } from 'react-redux'
import Presentational from 'components/presentational/Modal';
import { hideModal, actionFunctions } from 'domain/state/actions';

const mapStateToProps = state => ({
  loading: state.ui.loading,
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