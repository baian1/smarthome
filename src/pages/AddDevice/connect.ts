import { connect } from 'react-redux';
import { AppStateInterface } from "rootstate/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AllAction } from "rootstate/action";
import { AddDevice } from "./addDevice";
import { addUserDevice } from "rootstate/action/user";

const mapStateToProps = (state: AppStateInterface) => {
  return {
    userID: state.user.id,
  }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateInterface, null, AllAction>) => {
  return {
    addUserDevice: (user: string, device: string) => dispatch(addUserDevice(user, device)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDevice)