import React, { Component } from 'react'
// import Product from '../Product/Product'
import ProductCardList from '../ProductCardList/ProductCardList'
import Button from '../Button/Button'

const sortMode = {
  NONE: 'NONE',
  NAME: 'NAME',
  PRICE: 'PRICE'
}

export default class ProductList extends Component {
  state = {
    products: this.props.products,
    searchCategories: [''],
    searchField: '',
    sortBy: sortMode.NONE,
    ascendingName: false,
    ascendingPrice: false,
  }

  filterByCategory(searchCategory) {
    return (
      this.props.products.filter(product => (
        product.category.toLowerCase().includes(searchCategory)
      ))
    )
  }

  filterByCategories(searchCategories) {
    if (searchCategories.length === 0 || searchCategories[0] === '') return this.setState({products: this.props.products})

    let filteredProducts = []
    searchCategories.forEach(searchCategory => filteredProducts.push(this.filterByCategory(searchCategory)))

    const finalFilteredProducts = filteredProducts.flat(searchCategories.length)
    this.setState({products: finalFilteredProducts})
  }

  compareFn(a,b) {
    if (a < b) {
      return -1;
    }
    if (b > a) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  sortByAscendingName(a, b) {
    const nameA = this.state.ascendingName ? a.name.toLowerCase() : b.name.toLowerCase() ; // ignore upper and lowercase
    const nameB = this.state.ascendingName ? b.name.toLowerCase() : a.name.toLowerCase(); // ignore upper and lowercase
    return this.compareFn(nameA, nameB)
  }

  sortByAscendingPrice(a, b) {
    const priceA = this.state.ascendingPrice ? a.price : b.price; // ignore upper and lowercase
    const priceB = this.state.ascendingPrice ? b.price : a.price; // ignore upper and lowercase
    return this.compareFn(priceA, priceB)
  }

  filterProducts() {
      const filteredProducts = this.state.products.filter(product => (
        product.name.toLowerCase().includes(this.state.searchField.toLowerCase())
      ))
      switch(this.state.sortBy) {
        case sortMode.NAME:
          filteredProducts.sort((a,b) => this.sortByAscendingName(a, b))
          break;
        case sortMode.PRICE:
          filteredProducts.sort((a,b) => this.sortByAscendingPrice(a, b))
          break;
        case sortMode.NONE:
          break;
        default:
          break;
      }
    return filteredProducts
  }

  onSearchChange(e) {
    this.setState({searchField: e.target.value})
  }

  toggleSortNameOrder() {
    this.setState({sortBy: sortMode.NAME, ascendingName: !this.state.ascendingName})
  }

  toggleSortPriceOrder() {
    this.setState({sortBy: sortMode.PRICE, ascendingPrice: !this.state.ascendingPrice})
  }

  handleClick(e) {
    const searchCategories = (e.target.value).split(',')
    this.setState({searchCategories})
    this.filterByCategories(searchCategories)
  }

  render() {
    const filteredProducts = this.filterProducts()
    return (
      <div className='m-auto font-sans'>
        <div className='mx-2'>
          <Button onClick={e => this.handleClick(e)} value='shirts'>Shirts</Button>
          <Button onClick={e => this.handleClick(e)} value='pants,skirts'>Pants and Skirts</Button>
          <Button onClick={e => this.handleClick(e)} value='jackets'>Jackets</Button>
          <Button onClick={e => this.handleClick(e)} value='' autoFocus={true}>All Products</Button>
        </div>
        <div className='grid grid-cols-2 gap-4 md:place-items-center bg-slate-100 px-3 py-2'>
          <div className='sm:pr-3 md:pr-5'>
            <label className='text-xs'>Search products:</label>
            <input className='outline-none ml-2 mr-25 py-1 px-2' type='search' onChange={(e) => this.onSearchChange(e)} placeholder='Enter search here'/>
          </div>
          <div className='sm:pl-3 md:pl-5'>
            <label className='text-xs'>Sort by:</label>
            <Button onClick={this.toggleSortNameOrder.bind(this)}>{!this.state.ascendingName ? 'A-Z' : 'Z-A'}</Button>
            <Button onClick={this.toggleSortPriceOrder.bind(this)}>{!this.state.ascendingPrice ? 'Low-High' : 'High-Low'}</Button>
          </div>
        </div>
        <ProductCardList products={filteredProducts}/>
      </div>
    )
  }
}
