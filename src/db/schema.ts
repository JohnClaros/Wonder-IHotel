import { sql } from 'drizzle-orm';
import { check, integer, text, real, date, timestamp, pgTableCreator, serial } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `Hotel-web_${name}`);

export const clientes = createTable('clientes', {
  dni: text('dni').primaryKey(),
  nombre: text('nombre').notNull(),
  email: text('email').notNull().unique(),
  telefono: text('telefono'),
  direccion: text('direccion'),
  fecha_registro: date('fecha_registro').default('now()'),
});

export const habitaciones = createTable('habitaciones', {
  id: serial("id").primaryKey(),
  nombre: text('nombre').notNull(),
  descripcion: text('descripcion'),
  precio: real('precio').notNull(),
  disponibilidad: integer('disponibilidad').default(1),
  capacidad: integer('capacidad').notNull(),
});

export const reservas = createTable('reservas', {
  id: serial("id").primaryKey(),
  cliente_dni: text('cliente_dni')
    .references(() => clientes.dni),
  habitacion_id: integer('habitacion_id')
    .notNull()
    .references(() => habitaciones.id),
  fecha_entrada: date('fecha_entrada').notNull(),
  fecha_salida: date('fecha_salida').notNull(),
  estado: text('estado').default('confirmada'),
});

export const contactos = createTable('contactos', {
  id: serial("id").primaryKey(),
  nombre: text('nombre').notNull(),
  email: text('email').notNull(),
  mensaje: text('mensaje').notNull(),
  fecha_envio: timestamp("fecha_envio")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const admins = createTable('admins', {
  id: serial("id").primaryKey(),
  usuario: text('usuario').notNull(),
  contrasenna: text('contrasenna').notNull(),
});

export const resennas = createTable('resennas', {
  id: serial('id').primaryKey(),
  nombre: text('nombre').notNull().unique(),
  mensaje: text('mensaje').notNull(),
  rating: integer('rating').notNull(),
  fecha_creacion: date('fecha_creacion').default('now()'),
    
  /*fecha_creacion: timestamp('fecha_creacion')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),*/
},
  (resennas) => [{
    checkConstraint: check("rating_check", sql`${resennas.rating} > 0 AND ${resennas.rating} < 6`),
  }]);