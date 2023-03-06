import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  updateSearchInput: () => {},
  searchData: [],
  updateSearchData: () => {},
})
export default InstaShareContext
