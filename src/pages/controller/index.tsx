import Navbar from "../../components/Navbar";
import React, { Props } from "react";
import { History } from "history";
import { Root } from "../../components/root/root";

interface P extends Props<{}> {
  history: History
}

class Controllor extends React.Component<P>{
  constructor(props: P) {
    super(props);
  }

  handleGoBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <>
        <Navbar title='controllor' onLeftClick={this.handleGoBack} />
        <div>
          <input />
        </div>

      </>
    )
  }
}

export default Root(Controllor, 'start');