import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
            <Image src="/images/eu.jpg" alt="minha foto" width={220} height={220} priority className={styles.img}/>
            <div className={styles.text}>
                <ul className={styles.ul}>
                    <li className={styles.li}>nome do aluno: Lucas Zani da Costa Luz</li>
                    <li className={styles.li}>turma 2TDS1</li>
                    <li className={styles.li}>nome dos instrutores: Thiago e Marcelo </li>
                    <li className={styles.li}>nome da atividade: Mapa de Ocorrências Urbanas</li>
                    <li className={styles.li}>A API retorna bairros e ocorrências de segurança urbana. Cada ocorrência pertence a um bairro específico.</li>
                </ul>
                <button className={styles.button}>
                    <Link href="/Mapa" className={styles.link} prefetch={true}> Link para próxima pagina</Link>
                </button>
            </div>
            </div>
        </ div>
    )
}