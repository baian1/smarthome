import React, { Props, ComponentProps, ComponentClass } from "react";
import './root.less';

type mode = 'center' | 'start';

export function Root<P = {}>(WrappedComponent: React.ComponentType<P>, mode: mode='center') {
  const prefix='root';

  return function (props: P) {
    return (
      <div className={`${prefix}-wrap ${prefix}-${mode}`}>
        <WrappedComponent {...props} />
      </div>
    );
  }
}