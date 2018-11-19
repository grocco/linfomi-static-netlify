import { connect } from 'react-redux'
import Presentational from 'components/presentational/Footer';
// import i18n from 'domain/i18n';
import { changePage } from 'domain/state/actions';
// import { withRouter } from "react-router-dom";

const mapStateToProps = () => ({
  mobile: typeof window !== 'undefined' ? window.innerWidth < 1024 : false
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