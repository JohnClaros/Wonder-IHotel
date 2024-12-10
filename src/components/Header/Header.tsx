"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from '../../styles/Header.module.css';
import icono from '../../../public/icono.jpg';
import Link from "next/link";

const Header = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image className={styles.logoImage} src={icono} alt="Logo del hotel"></Image>
        </Link>
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>
      <nav className={`${styles.navBar} ${menuOpen ? styles.active : ""}`}>
        <ul className={styles.navul}>
          <li className={styles.navli}><a href={"/"} className={styles.spt}>Inicio</a></li>
          <li className={styles.navli}><Link className={styles.spt} href={"/habitaciones"}>Habitaciones</Link></li>
          <li className={styles.navli}><Link className={styles.spt} href={"/nosotros"}>Nosotros</Link></li>
          <li className={styles.navli}><Link className={styles.spt} href={"/contacto"}>Contacto</Link></li>
          <li className={styles.navli}><Link className={styles.spt} href={"/resennas"}>Reseña</Link></li>
          <li>
            <Link href="/#sesion" passHref>
              <button className={styles.boton}>Consultar disponibilidad</button>
            </Link>
          </li>
        </ul>
      </nav>
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;