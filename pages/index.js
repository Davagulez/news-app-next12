import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import PageLayout from '../components/PageLayout'
import { useEffect, useState } from 'react'

export default function Home() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ad64c8bce4954149826c2db88c6dddec')
    .then(res => res.json())
    .then(response => {
      const articlesFetched = response.articles;
      setArticles(articlesFetched)
    })
  },[])

  console.log('articulos recibidos de la api', articles)
  return (
    <PageLayout title='NewsApp - Home'>
      <div className={styles.container}>
        {articles.length === 0 && <p>Loading ...</p>}
        {articles.length > 0 && articles.map((art, index) => ( 
          <article key={index}>
            <img 
              alt={`Image for the article ${art.title}`} 
              src={art.urlToImage === null ? '/404notfound.jpg' : art.urlToImage}
              className={styles.image}
            />
            <h2>{art.title}</h2>
            <p>{art.description}</p>
          </article>
        ))}
        <Link href='/about'> ir a About</Link>     
      </div>
    </PageLayout>
  )
}


