import { Component } from 'react'

export default class Button extends Component {
  render() {
    const {onClick, autoFocus, className, value, children} = this.props;
    return (
      <button onClick={onClick} className={`m-2 border-none outline-0 hover:shadow-xl focus:bg-white focus:text-sky-700 bg-sky-700 text-white cursor-pointer rounded-lg p-2 ${className}`} autoFocus={autoFocus} value={value}>{children}</button>
    )
  }
}
