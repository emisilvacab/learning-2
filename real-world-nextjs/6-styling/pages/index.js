import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.homepage}>
      <h1> Welcome to the CSS Modules example </h1>
    </div>
  )
}