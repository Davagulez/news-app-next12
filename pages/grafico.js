import styles from '../styles/Grafico.module.css'
import GraphicLayout from '../components/GraphicLayout'
import PageLayout from '../components/PageLayout'
import { useState, useEffect } from 'react'

export default function VistaGrafico() {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    async function getData() {
        try {
            const response = await fetch('datos-AMZN_GOOGL.json')
            const data = await response.json()
            setData(data)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        getData();
      return () => {
        setData([])
      }
    }, [])
    

    return (
        <PageLayout>
            <main className={styles.main}>
                <h1> gráfico AMZN_GOOGL para mostrarlo en el cliente con todos los items</h1>
                {/* {data && data.length === 0 && <p>Cargando ...</p>} */}
                {data && < GraphicLayout info={data}/>}
                {error && <h1>Error: {error}</h1>}
            </main>
        </PageLayout>
    )
}

// export async function getStaticProps() {
//     const response = await fetch('datos-AMZN_GOOGL.json')
//     const data = await response.json()
//     return data
// }