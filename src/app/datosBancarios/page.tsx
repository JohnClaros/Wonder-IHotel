"use client";
import React, {useState, Suspense} from "react";
import Layout from "@/components/Layout/Layout";
import styles from "@/styles/DatosBancarios.module.css";
import {useRouter, useSearchParams} from "next/navigation";

const regExCardnumber = /^\d{16}$/;
const regExCVC = /^\d{3,4}$/;

const DatosBancariosPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const habitacion_id = searchParams?.get("habitacion_id");
    const fecha_entrada = searchParams?.get("fecha_entrada");
    const fecha_salida = searchParams?.get("fecha_salida");

    const [ cardData, setCardData ] = useState({
        cardNumber: "",
        expirationDate: "",
        cvc: "",
        cardHolder: "",
    });

    const [ success, setSuccess ] = useState<string | null>(null);
    const [ errors, setErrors ] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateDForm = () => {
        let formErrors: any = {};

        if (!regExCardnumber.test(cardData.cardNumber)) {
            formErrors.cardNumber = "Número de tarjeta inválido. Debe tener 16 dígitos";
        }

        if (!cardData.expirationDate.trim()) {
            formErrors.expirationDate = "Fecha de expiración es obligatoria";
        }

        if (!regExCVC.test(cardData.cvc)) {
            formErrors.cvc = "CVC inválido. Debe tener entre 3 o 4 dígitos.";
        }

        if (!cardData.cardHolder.trim()) {
            formErrors.cardHolder = "Nombre del titular de la tarjeta es obligatorio";
        }

        return formErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formErrors = validateDForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        
        try {
          const response = await fetch("/api/actualizarEstadoReserva", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              habitacion_id,
              fecha_entrada,
              fecha_salida,
              estado: "confirmada",
            }),
          });

          if (response.ok) {
            setSuccess("!Pago realizado correctamente. Reserva realizada con éxito¡");
            setTimeout(() => { 
              setSuccess(null);
              router.push("/");
            }, 4000);
          } else {
            alert("Ocurrió un problema al confirmar el pago.");
          }
        } catch (error) {
          console.error("Error al confirmar el pago:", error);
          alert("Ocurrió un problema al procesar el pago.");
        }
    };
    return (
        <Layout>
          <h1 className={styles.h1}>Datos Bancarios</h1>
          
          {success && (
            <div className={styles.toast}>
                {success}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Número de Tarjeta:</label>
            <input
              className={styles.input}
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleChange}
              placeholder="Ingrese los 16 dígitos de su tarjeta"
              required
            />
            {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}
    
            <label className={styles.label}>Fecha de Expiración:</label>
            <input
              className={styles.input}
              type="month"
              name="expirationDate"
              value={cardData.expirationDate}
              onChange={handleChange}
              placeholder="MM/AA"
              required
            />
            {errors.expirationDate && <p className={styles.error}>{errors.expirationDate}</p>}
    
            <label className={styles.label}>CVC:</label>
            <input
              className={styles.input}
              type="text"
              name="cvc"
              value={cardData.cvc}
              onChange={handleChange}
              placeholder="Ingrese el CVC"
              required
            />
            {errors.cvc && <p className={styles.error}>{errors.cvc}</p>}
    
            <label className={styles.label}>Titular de la Tarjeta:</label>
            <input
              className={styles.input}
              type="text"
              name="cardHolder"
              value={cardData.cardHolder}
              onChange={handleChange}
              placeholder="Nombre del titular de la tarjeta"
              required
            />
            {errors.cardHolder && <p className={styles.error}>{errors.cardHolder}</p>}
    
            <button type="submit" className={styles.button}>
              Confirmar Pago
            </button>
          </form>
        </Layout>
    );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DatosBancariosPage />
    </Suspense>
  )
}