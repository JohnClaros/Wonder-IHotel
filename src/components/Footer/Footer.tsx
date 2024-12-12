import React from "react";
import styles from '../../styles/Footer.module.css';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <h5 className={styles.h5}>ACERCA DE WONDER IHOTEL</h5>
            <div className={styles.container}>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link className={styles.a} href={"/nosotros"}>Sobre Wonder IHotel</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href={"/legal"}>Aviso Legal</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href={"/preguntas"}>Preguntas frecuentes (FAQ)</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href={"/condiciones"}>Condiciones generales</Link>
                    </li>
                </ul>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link className={styles.a} href={"/galletas"}>Política de cookies</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href={"/proteccionDatos"}>Protección de datos</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href={"/blog"}>Blog</Link>
                    </li>
                    <li className={styles.li}>
                        <a className={styles.a} href={"/sesion"}>Trabajadores</a>
                    </li>
                </ul>
                <div >
                    <a className={styles.rsociales} href="https://www.instagram.com/">
                        <FaInstagram className={styles.iconsocial}/>
                    </a>
                    <a className={styles.rsociales} href="https://x.com/">
                        <FaXTwitter className={styles.iconsocial}/>
                    </a>
                    <a className={styles.rsociales} href="https://www.linkedin.com/">
                        <FaLinkedin className={styles.iconsocial}/>
                    </a>
                </div>
            </div>
            <div className={styles.copyRight}>
                <p>@Wonder IHotel</p>
                <p>Todos los derechos reservados</p>
            </div>
        </footer>
    );
};

export default Footer;