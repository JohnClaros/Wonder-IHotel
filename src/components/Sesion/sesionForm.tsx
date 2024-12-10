import React, { useState} from "react";
import styles from '../../styles/SesionForm.module.css';

interface SesionFormProps {
    formData: { usuario: string; contrasenna: string};
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onLogin: (e: React.FormEvent) => void;
}

const SesionForm: React.FC<SesionFormProps> = ({ formData, handleChange, onLogin }) => {
    return (
        <form onSubmit={onLogin} className={styles.formContainer}>
            <div>
                <label htmlFor="usuario">Nombre de usuario:</label>
                <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="Usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
            </div>
            <div>
                <label htmlFor="contrasenna">Contraseña:</label>
                <input
                    type="password"
                    id="contrasenna"
                    name="contrasenna"
                    placeholder="Contraseña"
                    value={formData.contrasenna}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
            </div>
            <button type="submit" className={styles.button}>Iniciar Sesion</button>
        </form>
    )
}

export default SesionForm;