import { connect } from 'react-redux'
import Presentational from 'components/version_2/presentational/Footer';
// import i18n from 'domain/i18n';
import { changePage } from 'domain/state/actions';
// import { withRouter } from "react-router-dom";

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changePage: (page) => {dispatch(changePage(page)).then(()=>ownProps.history.push(`/${page}`))},
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);


// export default withRouter(Connected);
export default Connected;