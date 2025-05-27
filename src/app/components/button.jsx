import styles from '../styles/button.module.css';
import Link from 'next/link';

export default function Button({ href, titulo }) {
    return (
        <button className={styles.button}>
                    <Link href={href} className={styles.link} prefetch={true}> {titulo} </Link>
                </button>
    )
}