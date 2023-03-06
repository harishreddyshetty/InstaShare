import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  updateSearchInput: () => {},
})
export default InstaShareContext
