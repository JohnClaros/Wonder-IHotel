export const dynamic = 'force-dynamic'

import { db } from '@/db';
import { NextResponse } from 'next/server';
import { habitaciones, clientes, reservas, contactos, admins, resennas } from "@/db/schema";

const clientesData  = [
    {
        dni: "12345678K",
        nombre: "Juan Carlos",
        email: "jingle@gmail.com",
        telefono: "654987321",
        direccion: "Calle Navidad, 31",
        fecha_registro: "10/12/2024"
    }
]

const habitacionesData  = [
    {
        id: 101,
        nombre: "Doble Normal",
        descripcion: "Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.",
        precio: 70.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 102,
        nombre: "Doble Normal",
        descripcion: "Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.",
        precio: 70.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 103,
        nombre: "Doble Normal",
        descripcion: "Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.",
        precio: 70.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 104,
        nombre: "Doble Normal",
        descripcion: "Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.",
        precio: 70.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 105,
        nombre: "Doble Normal",
        descripcion: "Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.",
        precio: 70.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 106,
        nombre: "Triple Normal",
        descripcion: "Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.",
        precio: 75.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 107,
        nombre: "Triple Normal",
        descripcion: "Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.",
        precio: 75.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 108,
        nombre: "Triple Normal",
        descripcion: "Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.",
        precio: 75.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 109,
        nombre: "Triple Normal",
        descripcion: "Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.",
        precio: 75.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 110,
        nombre: "Triple Normal",
        descripcion: "Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.",
        precio: 75.0 ,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 111,
        nombre: "Familiar Normal",
        descripcion: "Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfruten de su estancia.",
        precio: 80.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 112,
        nombre: "Familiar Normal",
        descripcion: "Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfruten de su estancia.",
        precio: 80.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 113,
        nombre: "Familiar Normal",
        descripcion: "Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfruten de su estancia.",
        precio: 80.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 114,
        nombre: "Familiar Normal",
        descripcion: "Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfruten de su estancia.",
        precio: 80.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 115,
        nombre: "Familiar Normal",
        descripcion: "Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfruten de su estancia.",
        precio: 80.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 201,
        nombre: "Doble Deluxe",
        descripcion: "Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sofisticada, baño con acabados premium y servicios adicionales para una experiencia superior.",
        precio: 90.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 202,
        nombre: "Doble Deluxe",
        descripcion: "Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sofisticada, baño con acabados premium y servicios adicionales para una experiencia superior.",
        precio: 90.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 203,
        nombre: "Doble Deluxe",
        descripcion: "Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sofisticada, baño con acabados premium y servicios adicionales para una experiencia superior.",
        precio: 90.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 204,
        nombre: "Doble Deluxe",
        descripcion: "Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sofisticada, baño con acabados premium y servicios adicionales para una experiencia superior.",
        precio: 90.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 205,
        nombre: "Doble Deluxe",
        descripcion: "Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sofisticada, baño con acabados premium y servicios adicionales para una experiencia superior.",
        precio: 90.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 206,
        nombre: "Triple Deluxe",
        descripcion: "Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.",
        precio: 95.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 207,
        nombre: "Triple Deluxe",
        descripcion: "Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.",
        precio: 95.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 208,
        nombre: "Triple Deluxe",
        descripcion: "Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.",
        precio: 95.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 209,
        nombre: "Triple Deluxe",
        descripcion: "Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.",
        precio: 95.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 210,
        nombre: "Triple Deluxe",
        descripcion: "Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.",
        precio: 95.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 211,
        nombre: "Familiar Deluxe",
        descripcion: "La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.",
        precio: 100.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 212,
        nombre: "Familiar Deluxe",
        descripcion: "La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.",
        precio: 100.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 213,
        nombre: "Familiar Deluxe",
        descripcion: "La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.",
        precio: 100.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 214,
        nombre: "Familiar Deluxe",
        descripcion: "La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.",
        precio: 100.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 215,
        nombre: "Familiar Deluxe",
        descripcion: "La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.",
        precio: 100.0,
        disponibilidad: 1,
        capacidad: 4
      },
      {
        id: 301,
        nombre: "Doble Suite",
        descripcion: "Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.",
        precio: 120.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 302,
        nombre: "Doble Suite",
        descripcion: "Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.",
        precio: 120.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 303,
        nombre: "Doble Suite",
        descripcion: "Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.",
        precio: 120.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 304,
        nombre: "Doble Suite",
        descripcion: "Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.",
        precio: 120.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 305,
        nombre: "Doble Suite",
        descripcion: "Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.",
        precio: 120.0,
        disponibilidad: 1,
        capacidad: 2
      },
      {
        id: 306,
        nombre: "Triple Suite",
        descripcion: "Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.",
        precio: 130.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 307,
        nombre: "Triple Suite",
        descripcion: "Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.",
        precio: 130.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 308,
        nombre: "Triple Suite",
        descripcion: "Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.",
        precio: 130.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 309,
        nombre: "Triple Suite",
        descripcion: "Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.",
        precio: 130.0,
        disponibilidad: 1,
        capacidad: 3
      },
      {
        id: 310,
        nombre: "Triple Suite",
        descripcion: "Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.",
        precio: 130.0,
        disponibilidad: 1,
        capacidad: 3
      }
]

const reservasData  = [
    {
        id: 1,
        cliente_dni: clientesData[0].dni,
        habitacion_id: habitacionesData[0].id,
        fecha_entrada: new Date().toISOString(),
        fecha_salida: new Date().toISOString(),
        estado: "confirmada"
    }
]

const contactosData  = [
    {
        id: 1,
        nombre: "John Andre Claros Ovando",
        email: "john@gmail.com",
        mensaje: "sadasfaf",
    }
]

const adminsData  = [
    {
        id: 1,
        usuario: "admin",
        contrasenna: "Pñas6@ñ9/"
    }
]

const resennasData  = [
    {
        id: 1,
        nombre: "Juan Carlos I",
        mensaje: "Zumo de naranja, mandarina o vitamina C",
        rating: 5,
    }
]

export async function GET() {
	const result = await db.transaction(async (_db) => {

		console.log("Seeding database")
		const habitacionesRes = await _db.insert(habitaciones).values(habitacionesData).returning().execute()
		if (habitacionesRes?.length === 0) {
			console.log("Error seeding habitaciones")
			return
		}
		console.log("Habitaciones seeded")

        const clientesRes = await _db.insert(clientes).values(clientesData).returning().execute()
		if (clientesRes?.length === 0) {
			console.log("Error seeding clientes")
			return
		}
		console.log("Clientes seeded")

        const reservasRes = await _db.insert(reservas).values(reservasData).returning().execute()
		if (clientesRes?.length === 0) {
			console.log("Error seeding reservas")
			return
		}
		console.log("Reservas seeded")

        const contactosRes = await _db.insert(contactos).values(contactosData).returning().execute()
		if (contactosRes?.length === 0) {
			console.log("Error seeding contactos")
			return
		}
		console.log("Contactos seeded")

        const adminsRes = await _db.insert(admins).values(adminsData).returning().execute()
		if (adminsRes?.length === 0) {
			console.log("Error seeding admins")
			return
		}
		console.log("Admins seeded")

        const resennasRes = await _db.insert(resennas).values(resennasData).returning().execute()
		if (resennasRes?.length === 0) {
			console.log("Error seeding resennas")
			return
		}
		console.log("Resennas seeded")

		console.log("Seed complete")

		return true
	})
	if (!result) {
		return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
	}
	return NextResponse.json({ message: 'Seed successfull' })
}
