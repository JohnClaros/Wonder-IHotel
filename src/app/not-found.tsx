import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import styles from '../styles/NotFound.module.css'
import icono from '../../public/not-found.webp'

export default function NotFound() {
	return (
        <div className={styles.fondo}>
            <div>
                <Image className={styles.imagen} src={icono} alt='Logo Not Found' />
            </div>
            <div className={styles.texto}>
                <h1>Página no encontrada</h1>
                <p>Estamos chambeando en ello ;)</p>
                <div className={styles.link}>
                    <Link
                        href="/"
                        className="text-primary text-sm font-semibold"
                        aria-label="Status View"
                    >&larr;<span className={styles.span}> Volver al inicio.</span>
                    </Link>
                </div>
            </div>
        </div>
	)
}