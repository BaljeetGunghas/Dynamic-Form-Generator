'use client'

import Image from 'next/image'
import styles from './page.module.css'
import FormGenerator from '@/Pages/FormGenrator'

export default function Home() {
  return (
    <main className={styles.main}>
      <FormGenerator />
    </main>
  )
}
