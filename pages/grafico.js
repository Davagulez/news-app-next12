import styles from '../styles/Grafico.module.css'
import GraphicLayout from '../components/GraphicLayout'
import { useState, useEffect } from 'react'

export default function VistaGrafico() {
    const [data, setData] = useState([])

    async function getData() {
        try {
            const response = await fetch('datos-AMZN_GOOGL.json')
            const data = await response.json()
            setData(data)
            console.log(data)
        } catch (error) {
            return error 
        }
    }

    useEffect(() => {
        getData();
      return () => {
        setData([])
      }
    }, [])
    

    return (
        <main className={styles.main}>
            <h1> Esta es la pagina donde voy a colocar el gráfico</h1>
            {data && data.length === 0 && <p>Cargando ...</p>}
            {data && data.length > 0 && < GraphicLayout info={data}/>}
        </main>
    )
}

// export async function getStaticProps() {
//     const response = await fetch('datos-AMZN_GOOGL.json')
//     const data = await response.json()
//     return data
// }