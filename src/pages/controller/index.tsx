import Navbar from "../../components/Navbar";
import React, { Props } from "react";
import { History } from "history";
import { withRoot } from "../../components/root/root";

interface P extends Props<{}> {
  history: History;
}

class Controllor extends React.Component<P>{
  public constructor(props: P) {
    super(props);
  }

  public handleGoBack = (): void => {
    this.props.history.goBack();
  }

  public render(): JSX.Element {
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

export default withRoot(Controllor, 'start');