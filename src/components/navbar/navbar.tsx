import React from 'react'
import { Text } from '../Text/Text'
import styles from './navbar.module.css'

export const navbar: React.FC<any> = (props) => {
    console.log({props})
  return (
      <nav>
          <div className={ styles.content}>
              <Text varient={'h2'}>Job Tracker</Text>
              <div>

              </div>
        </div>
    </nav>
  )
}


