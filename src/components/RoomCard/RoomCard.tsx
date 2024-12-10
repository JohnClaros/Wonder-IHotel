import React from "react";
import styles from '../../styles/RoomCard.module.css';
import Link from "next/link";
import Image from "next/image";
import { FaGlassMartiniAlt, FaLock, FaSnowflake, FaTv, FaUtensils, FaWifi } from "react-icons/fa";

interface Room {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  capacidad: number;
  disponibilidad: number;
  dimensiones?:string;
}

const RoomCard = ({ room }: {room: Room }) => {
  return (
    <div className={styles.card}>

      <div className={styles.izq}>
        <Image
          className={styles.imagen}
          src={`/fotoHabitaciones/${room.nombre}.webp`}
          alt={`Habitación ${room.nombre}`}
          width={1250}
          height={1250}
        />
        {room.dimensiones && (
          <div className={styles.overlay}>
            Dimensiones: {room.dimensiones}
          </div>
        )}
      </div>

      <div className={styles.der}>
        <h3 className={styles.h3}>
          Habitación {room.nombre}
        </h3>
        <p className={styles.p} style={{ overflowWrap: "break-word"}}>
          {room.descripcion}
        </p>
        <h4 className={styles.serviciosTitulo}>SERVICIOS DE HABITACIÓN</h4>
        <div className={styles.servicios}>
          <ul>
            <li>
              <FaWifi className={styles.icono} /> Wi-Fi Gratis
            </li>
            <li>
              <FaTv className={styles.icono} /> Televisión por Cable
            </li>
            <li>
              <FaSnowflake className={styles.icono} /> Aire acondicionado
            </li>
            <li>
              <FaLock className={styles.icono} /> Caja de seguridad
            </li>
            <li>
              <FaGlassMartiniAlt className={styles.icono} /> Minibar
            </li>
            <li>
              <FaUtensils className={styles.icono} /> Desayuno Incluido
            </li>
          </ul>
        </div>
        <p className={styles.precio}>
          Precio por noche: {room.precio.toFixed(2)}€
        </p>
        <button className={styles.boton}>
          <Link href="/#sesion">Consultar disponibilidad</Link>
        </button>
      </div>
    </div>
  );
};
  
export default RoomCard;