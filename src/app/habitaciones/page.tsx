"use client";
import React, { useEffect, useState } from "react";
import RoomCard from '../../components/RoomCard/RoomCard';
import Layout from "@/components/Layout/Layout";
import styles from "../../styles/Habitaciones.module.css";

interface Room {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponibilidad: number;
  capacidad: number;
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
 
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/habitaciones');
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error)
      }

    };
    fetchRooms();
  }, []);

  return (
    <div>
      <Layout>
        <h1 className={styles.h1}>Habitaciones</h1>

        <div className={styles.contenedor1}>
          <div className={styles.descripcion}>
            <p className={styles.p}>
              En Wonder IHotel, nuestras 40 exclusivas habitaciones están diseñadas para ofrecerte una experiencia única de confort y tranquilidad.
              Cada estancia está cuidadosamente decorada con un estilo moderno y acogedor, y cada ventana se convierte en un marco que captura vistas inigualables del entorno.
            </p>
            <p className={styles.p}>
              Equipadas con técnología de última generación, nuestras habitaciones cuentan con sistemas domóticos inteligentes que aseguran un aislamiento térmico,
              acústico y lumínico implecable. Podrás controlar fácilmente la iluminación, la temperatura y otros servicios con un solo toque, garantizando una experiencia personalizada.
            </p>
            <p className={styles.p}>
              El confort está en los detalles: todas nuestras habitaciones incluyen televisores inteligentes de pantalla panorámica y una selección de opciones audiovisuales para que disfrutes de tu estancia como en casa.
              Pensando en tu descanso, ponemos a tu disposición una carta de almohadas con distintas opciones, adaptadas a tus necesidades para que disfrutes del sueño perfecto.
            </p>
            <p className={styles.p}>
              El lujo y la comodidad se reflejan también en nuestros baños, que están equipados con duchas de hidromasaje y bañeras independientes, ideales para relajarte después de un día explorando o trabajando.
            </p>
            <p className={styles.p}>
              Ven y descubre por qué Wonder IHotel es sinónimo de descanso y bienestar, un lugar donde cada detalle ha sido diseñado para hacer de tu estancia una experiencia inolvidable.
            </p>
          </div>
        </div>
        
        <div className={styles.roomsContainer}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Rooms;