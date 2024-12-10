import styles from "../styles/InicioPage.module.css";
import Inicio from "./Home/index";
import React from "react";
import Layout from "@/components/Layout/Layout";

export default function Home() {
  return (
      <div className={styles.page}>
        <Layout>
          <Inicio />
        </Layout>
      </div>
  );
}
