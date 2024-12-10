"use client"
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import ContactForm from "@/components/Contact/contactForm";
import styles from '../../styles/ContactPage.module.css';

const ContactoPage: React.FC = () => {
    return (
        <Layout>
            <h1 className={styles.h1}>Contacto</h1>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <ContactForm />
                </div>
                <div className={styles.rightColumn}>
                    <iframe className={styles.iframe} src="https://www.openstreetmap.org/export/embed.html?bbox=-3.71746826171875%2C40.47220600043513%2C-3.7111949920654297%2C40.47569320866924&layer=mapnik"
                        style={{ border: 0}}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </Layout>
    );
};

export default ContactoPage;