import React from 'react'
import logo from '../images/logo.svg';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt=''/>
    </div>
  )
}
