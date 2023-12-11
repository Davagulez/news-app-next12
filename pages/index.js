import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import PageLayout from '../components/PageLayout'
import { useEffect, useState } from 'react'

export default function Home({ articles }) {
  
  return (
    <PageLayout title='NewsApp - Home'>
      <section className={styles.container}>
        {articles.length === 0 && <p>No tenemos articulos</p>}
        {articles.length > 0 && articles.map((art, index) => ( 
          <article key={index} className={styles.article}>
            <figure className={styles.image_container}>
              <Image 
                alt={`Image for the article ${art.title}`} 
                src={'/404notfound.jpg'}
                width={400}
                height={400}
                layout='responsive'
                priority={true}
                className={styles.image}
              />
            </figure>
            <section className={styles.main_texts}>
              <h2 className={styles.title}>{art.title}</h2>
              <p className={styles.paragraph}>{art.description}</p>
            </section>
          </article>
        ))}
        <Link href='/about'> ir a About</Link>     
      </section>
    </PageLayout>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ad64c8bce4954149826c2db88c6dddec', {
    method: 'GET'
  })
  const { articles } = await response.json()
    return {
      props: {
        articles
      }
    }
}

