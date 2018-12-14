import { connect } from 'react-redux'
import Presentational from 'components/presentational/pages/Donations';
import { showModal } from 'domain/state/actions';

const mapStateToProps = state => ({
    language: state.ui.language,
});

const mapDispatchToProps = dispatch => ({
  onDonate: (amount, description) => dispatch(showModal({name: 'DONATION_START', amount, description})),
  onTransactionStart: (amount, description) => dispatch(showModal({name: 'DONATION_START', amount, description})),
  onTransactionSuccessful: (amount, email) => dispatch(showModal({name: 'DONATION_SUCCESSFUL', amount, email }))
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

export default Connected;