import SignInUp from '@/components/sign-in-up/SignInUp'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.authorization}>
      <SignInUp />
    </main>
  )
}
