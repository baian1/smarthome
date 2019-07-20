import React from "react";
import './index.less';

type positionType = 'absolute' | 'relative';

interface NavBarProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  icon?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onLeftClick?: React.MouseEventHandler<HTMLDivElement>;
  onrightClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  position?: positionType;
}

const leftIcon = <svg viewBox="0 0 1024 1024" version="1.1" p-id="1731" height="100%"><path d="M589.088 790.624L310.464 512l278.624-278.624 45.248 45.248L400.96 512l233.376 233.376z" fill="#181818" p-id="1732" /></svg>

function Navbar(props: NavBarProps): JSX.Element {
  const prefix = 'navbar';

  const {
    icon = leftIcon,
    leftContent,
    rightContent,
    onLeftClick,
    onrightClick,
    title = 'title',
    position = 'absolute'
  } = props;

  return (
    <>
      {position === 'absolute' ? <div className="navbar-bottom" /> : null}
      <div className='navbar'>
        <div className={`${prefix}-left`}>
          {onLeftClick ? <div onClick={onLeftClick} style={{ height: "100%" }}>{icon}</div> : null}
          {leftContent}
        </div>
        <div className={`${prefix}-title`}>{title}</div>
        <div className={`${prefix}-right`}>
          {onrightClick ?
            <button className={`${prefix}-button`} onClick={onrightClick}>{rightContent}</button>
            : null}
        </div>
      </div>
    </>
  )
}

export default React.memo(Navbar);