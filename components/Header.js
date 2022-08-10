import React from 'react'
import styles from '../styles/Home.module.css'
import SearchBar from './SearchBar'

function Header() {
  return (
      <nav className={styles.navigationBar}>
          <div>
              <h1 className={styles.navigationHeading}>The TV Show App</h1>
          </div>
          <div>
            <SearchBar />
          </div>
      </nav>
  )
}

export default Header