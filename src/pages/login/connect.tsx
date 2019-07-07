import { connect } from 'react-redux';
import { Login } from './login'
import { AllAction } from "redux/action";
import { ThunkDispatch } from 'redux-thunk';
import { AppStateInterface } from 'redux/reducers';
import { login } from 'redux/action/user';


export const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateInterface,null,AllAction>) => {
  return {
    login: (userID: string, password: string) => dispatch(login(userID, password)),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Login)