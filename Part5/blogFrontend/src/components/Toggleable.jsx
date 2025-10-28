import { useState } from 'react'

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const hasOverride = Object.hasOwn(props, 'override')
  const show = hasOverride?props.override:visible

  const hideWhenVisible = { display: show ? 'none' : '' }
  const showWhenVisible = { display: show ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      {!hasOverride && 
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      }
      <div style={showWhenVisible}>
        {!hasOverride && 
          <button onClick={toggleVisibility}>{props.hideLabel || 'cancel'}</button>
        }
        {props.children}
      </div>
    </>
  )
}

export default Toggleable