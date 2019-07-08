import { connect } from 'react-redux';
import { Login } from './login'
import { AllAction } from "rootstate/action";
import { ThunkDispatch } from 'redux-thunk';
import { AppStateInterface } from 'rootstate/reducers';
import { login } from 'rootstate/action/user';


export const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateInterface,null,AllAction>) => {
  return {
    login: (userID: string, password: string) => dispatch(login(userID, password)),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Login)