"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "./gallery";
import { User } from "./types/user";
import { useEffect, useState } from "react";
import { Photo } from "./types/photo";

export default function Home() {
  // get data from https://jsonplaceholder.typicode.com/users
  const [users, setUsers] = useState<User[]>([]);
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => setUsers(data));

      const fetchData = async () => {
        try {
          const [usersRes, imagesRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://picsum.photos/v2/list?page=2&limit=10')
          ]);
  
          if (!usersRes.ok || !imagesRes.ok) {
            throw new Error('One or both fetch requests failed');
          }
  
          const users = await usersRes.json();
          const images = await imagesRes.json();
  
          setUsers(users);
          setImages(images);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <Gallery users={users} photos={images}/>
    </main>
  );
}
