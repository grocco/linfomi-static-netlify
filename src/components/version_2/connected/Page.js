import { connect } from 'react-redux'
import Presentational from 'components/version_2/presentational/Page';
// import { withRouter } from "react-router-dom";

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);

// export default withRouter(Connected);
export default Connected;