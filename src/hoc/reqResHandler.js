import React, {Component, Fragment} from 'react';
import Modal from "../components/UI/Modal/Modal";
import Spinner from "../components/UI/Spinner/Spinner";
import Backdrop from "../components/UI/Backdrop/Backdrop";

const reqResHandler = (WrappedComponent, axios) => {
  return class WithErrorHOC extends Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null
      };

      this.state.interceptorId1 = axios.interceptors.response.use(res => {
        this.setState({isLoading: false});
        return res;
      }, error => {
        this.setState({error, isLoading: false});
        throw error;
      });

      this.state.interceptorId2 = axios.interceptors.request.use(req => {
        this.setState({isLoading: true});
        return req;
      });
    }

    componentWillUnmount() {
      axios.interceptors.response.eject(this.state.interceptorId1);
      axios.interceptors.response.eject(this.state.interceptorId2);
    }

    errorDismissed = () => {
      this.setState({error: null});
    };

    render() {
      return (
        <Fragment>
          {true &&
            <Fragment>
              <Spinner />
              <Backdrop show={true}/>
            </Fragment>}
          <Modal show={this.state.error} close={this.errorDismissed}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} {...this.state} />
        </Fragment>
      );
    }
  };
};

export default reqResHandler;
