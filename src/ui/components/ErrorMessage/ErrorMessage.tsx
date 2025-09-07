import React from "react";
import styles from "./ErrorMessage.module.css";

type Props = { message: string };

export default function ErrorMessage({ message }: Props) {
  return <div className={styles.error}>{message}</div>;
}