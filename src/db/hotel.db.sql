BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "clientes" (
	"dni"	TEXT,
	"nombre"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"telefono"	TEXT,
	"direccion"	TEXT,
	"fecha_registro"	DATE DEFAULT (date('now')),
	PRIMARY KEY("dni")
);
CREATE TABLE IF NOT EXISTS "habitaciones" (
	"id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"descripcion"	TEXT,
	"precio"	REAL NOT NULL,
	"disponibilidad"	INTEGER DEFAULT 1,
	"capacidad"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "reservas" (
	"id"	INTEGER,
	"cliente_dni"	TEXT NOT NULL,
	"habitacion_id"	INTEGER NOT NULL,
	"fecha_entrada"	DATE NOT NULL,
	"fecha_salida"	DATE NOT NULL,
	"estado"	TEXT DEFAULT 'confirmada',
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("cliente_dni") REFERENCES "clientes"("dni"),
	FOREIGN KEY("habitacion_id") REFERENCES "habitaciones"("id")
);
CREATE TABLE IF NOT EXISTS "contactos" (
	"id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	"mensaje"	TEXT NOT NULL,
	"fecha_envio"	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "admins" (
	"id"	INTEGER,
	"usuario"	TEXT NOT NULL,
	"contrasenna"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "resennas" (
	"id"	INTEGER,
	"nombre"	TEXT NOT NULL UNIQUE,
	"mensaje"	TEXT NOT NULL,
	"rating"	INTEGER NOT NULL CHECK("rating" BETWEEN 1 AND 5),
	"fecha"	DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "clientes" VALUES ('12345678K','Juan Carlos','jingle@gmail.com','654987321','Calle Navidad, 31','10/12/2024');
INSERT INTO "habitaciones" VALUES (101,'Doble Normal','Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.',70.0,1,2);
INSERT INTO "habitaciones" VALUES (102,'Doble Normal','Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.',70.0,1,2);
INSERT INTO "habitaciones" VALUES (103,'Doble Normal','Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.',70.0,1,2);
INSERT INTO "habitaciones" VALUES (104,'Doble Normal','Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.',70.0,1,2);
INSERT INTO "habitaciones" VALUES (105,'Doble Normal','Una acogedora habitación diseñada para dos personas, ideal para una estancia cómoda y funcional. Cuentan con una cama doble, decoración moderna, baño privado y todas las comodidades básicas para garantizar una experiencia relajante.',70.0,1,2);
INSERT INTO "habitaciones" VALUES (106,'Triple Normal','Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.',75.0,1,3);
INSERT INTO "habitaciones" VALUES (107,'Triple Normal','Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.',75.0,1,3);
INSERT INTO "habitaciones" VALUES (108,'Triple Normal','Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.',75.0,1,3);
INSERT INTO "habitaciones" VALUES (109,'Triple Normal','Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.',75.0,1,3);
INSERT INTO "habitaciones" VALUES (110,'Triple Normal','Perfecta para grupos pequeños o familias, esta habitación ofrece espacio adicional y capacidad para tres personas. Incluye una cama doble y una individual, con un diseño práctico y confortable que asegura el descanso de todos los huéspedes.',75.0,1,3);
INSERT INTO "habitaciones" VALUES (111,'Familiar Normal','Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfuten de su estancia.',80.0,1,4);
INSERT INTO "habitaciones" VALUES (112,'Familiar Normal','Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfuten de su estancia.',80.0,1,4);
INSERT INTO "habitaciones" VALUES (113,'Familiar Normal','Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfuten de su estancia.',80.0,1,4);
INSERT INTO "habitaciones" VALUES (114,'Familiar Normal','Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfuten de su estancia.',80.0,1,4);
INSERT INTO "habitaciones" VALUES (115,'Familiar Normal','Pensada para familias, esta habitación combina espacio y comodidad. Equipada con una cama doble y dos individuales, ofrece un ambiente tranquilo y funcional para que todos disfuten de su estancia.',80.0,1,4);
INSERT INTO "habitaciones" VALUES (201,'Doble Deluxe','Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sotifiscada, baño con acabados premium y servicios adicionales para una experiencia superior.',90.0,1,2);
INSERT INTO "habitaciones" VALUES (202,'Doble Deluxe','Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sotifiscada, baño con acabados premium y servicios adicionales para una experiencia superior.',90.0,1,2);
INSERT INTO "habitaciones" VALUES (203,'Doble Deluxe','Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sotifiscada, baño con acabados premium y servicios adicionales para una experiencia superior.',90.0,1,2);
INSERT INTO "habitaciones" VALUES (204,'Doble Deluxe','Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sotifiscada, baño con acabados premium y servicios adicionales para una experiencia superior.',90.0,1,2);
INSERT INTO "habitaciones" VALUES (205,'Doble Deluxe','Un toque de lujo para dos personas. Esta habitación combina elegancia y confort, equipada con una cama doble de alta calidad, decoración sotifiscada, baño con acabados premium y servicios adicionales para una experiencia superior.',90.0,1,2);
INSERT INTO "habitaciones" VALUES (206,'Triple Deluxe','Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.',95.0,1,3);
INSERT INTO "habitaciones" VALUES (207,'Triple Deluxe','Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.',95.0,1,3);
INSERT INTO "habitaciones" VALUES (208,'Triple Deluxe','Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.',95.0,1,3);
INSERT INTO "habitaciones" VALUES (209,'Triple Deluxe','Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.',95.0,1,3);
INSERT INTO "habitaciones" VALUES (210,'Triple Deluxe','Para aquellos que buscan lujo y espacio, esta habitación ofrece capacidad para tres personas con camas premium, diseño exclusivo, baño elegante con detalles de lujo y servicios personalizados que elevan la experiencia de los huéspedes.',95.0,1,3);
INSERT INTO "habitaciones" VALUES (211,'Familiar Deluxe','La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.',100.0,1,4);
INSERT INTO "habitaciones" VALUES (212,'Familiar Deluxe','La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.',100.0,1,4);
INSERT INTO "habitaciones" VALUES (213,'Familiar Deluxe','La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.',100.0,1,4);
INSERT INTO "habitaciones" VALUES (214,'Familiar Deluxe','La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.',100.0,1,4);
INSERT INTO "habitaciones" VALUES (215,'Familiar Deluxe','La elección perfecta para familias que desean disfrutar de un toque de sofisticación. Con una cama doble y dos camas individuales, esta habitación incluye decoración moderna, baño de lujo y servicios que garantizan una estancia inolvidable.',100.0,1,4);
INSERT INTO "habitaciones" VALUES (301,'Doble Suite','Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.',120.0,1,2);
INSERT INTO "habitaciones" VALUES (302,'Doble Suite','Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.',120.0,1,2);
INSERT INTO "habitaciones" VALUES (303,'Doble Suite','Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.',120.0,1,2);
INSERT INTO "habitaciones" VALUES (304,'Doble Suite','Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.',120.0,1,2);
INSERT INTO "habitaciones" VALUES (305,'Doble Suite','Una experiencia exclusiva para dos personas, esta suite combina lujo y privacidad. Cuenta con una cama king-size, sala de estar independiente, decoración de alta gama y un baño con bañera o ducha de hidromasaje, perfecta para una escapada romántica.',120.0,1,2);
INSERT INTO "habitaciones" VALUES (306,'Triple Suite','Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.',130.0,1,3);
INSERT INTO "habitaciones" VALUES (307,'Triple Suite','Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.',130.0,1,3);
INSERT INTO "habitaciones" VALUES (308,'Triple Suite','Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.',130.0,1,3);
INSERT INTO "habitaciones" VALUES (309,'Triple Suite','Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.',130.0,1,3);
INSERT INTO "habitaciones" VALUES (310,'Triple Suite','Ideal para familias o pequeños grupos que buscan un lujo excepcional. Esta suite incluye espacio para tres personas, con áreas separadas para descanso y relajación, decoración premium, y un baño equipado con bañera de hidromasaje o duchas de lujo.',130.0,1,3);
INSERT INTO "reservas" VALUES (68,'12345678K',306,'2024-12-24','2024-12-27','pendiente');
INSERT INTO "contactos" VALUES (17,'John Andre Claros Ovando','john@gmail.com','sadasfaf','2024-12-10 10:36:37');
INSERT INTO "contactos" VALUES (18,'John Andre Claros Ovando','john@gmail.com','asdasdasdsadsad','2024-12-10 10:41:37');
INSERT INTO "contactos" VALUES (19,'John Andre Claros Ovando','john@gmail.com','dsadsadasa','2024-12-10 10:42:52');
INSERT INTO "admins" VALUES (1,'admin','Pñas6@ñ9/');
INSERT INTO "resennas" VALUES (19,'dsadadsa','adssadasd',4,'10/12/2024');
INSERT INTO "resennas" VALUES (20,'asdsadsadas','adssada',1,'10/12/2024');
INSERT INTO "resennas" VALUES (21,'dasdasdadasf','fsafsadsfdsf',3,'10/12/2024');
INSERT INTO "resennas" VALUES (22,'sadsadsafsf','fdsfdsfsdfdsf',3,'10/12/2024');
COMMIT;
