import { connect } from 'react-redux';
import { Login } from './login'
import { login } from "../../redux/action/user";


export const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (userID: string, password: string) => dispatch(login(userID, password)),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Login)