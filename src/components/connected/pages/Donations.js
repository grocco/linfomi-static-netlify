import { connect } from 'react-redux'
import Presentational from 'components/presentational/pages/Donations';
import { showModal } from 'domain/state/actions';

const mapStateToProps = state => ({
    language: state.ui.language,
    windowInnerWidth: state.ui.screen.width,
});

const mapDispatchToProps = dispatch => ({
  onDonate: (amount) => dispatch(showModal({name: 'DONATION_START', amount, description: 'Checking credit card validity...'})),
  onTransactionStart: (amount) => dispatch(showModal({name: 'DONATION_START', amount, description: 'Performing transaction...'})),
  onTransactionSuccessful: (amount, email) => dispatch(showModal({name: 'DONATION_SUCCESSFUL', amount, email }))
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default Connected;