import { Component } from 'react'

export default class Product extends Component {
  state = { active: false }

  render() {
    const {name, category, description, price, imgUrl} = this.props.product
    return (
      <div className='flex flex-col justify-between items-center rounded-lg border-0 hover:shadow-xl hover:border-sky-50 px-6 py-2'>
        <p className='text-slate-400 text-xs flex-start'>{category}</p>
        <img className='w-full' onClick={() => (this.setState({active: !this.state.active}))} src={imgUrl} alt={name}/>
        <div className='h-50'>
          <p onClick={() => (this.setState({active: !this.state.active}))} className='font-bold'>{name} </p>
          <p className='text-slate-500 text-right'>${price}</p>
          <p className={`text-xs text-justify ${this.state.active ? 'visible' : 'collapse'}`}>{description}</p>
         </div>
      </div>
    )
  }
}
