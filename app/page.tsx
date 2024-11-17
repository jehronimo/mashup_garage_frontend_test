"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "./gallery";
import { User } from "./types/user";
import { useEffect, useState } from "react";

export default function Home() {
  // get data from https://jsonplaceholder.typicode.com/users
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => setUsers(data));
  }, []);

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
