import { Component } from 'react'
import Product from '../Product/Product'

export default class ProductCardList extends Component {
  render() {
    return (
      <div className='grid sm:grid-cols-2 md:grid-cols-3 grid-cols-3 gap-4 place-items-stretch'>
          {
            this.props.products?.map((product, i) => <Product key={i} product={product}/>)
          }
      </div>
    )
  }
}
