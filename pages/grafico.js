import styles from '../styles/Grafico.module.css'
import GraphicLayout from '../components/GraphicLayout'
import PageLayout from '../components/PageLayout'
import { useState, useEffect } from 'react'
import getDataFromJSON from './api/getDataFromJSON'


export default function VistaGrafico({ data }) {
    const [dataFromJSON, setDataFromJSON] = useState([])

    useEffect(() => {
        setDataFromJSON(data)
    }, [data])
    
    return (
        <PageLayout>
            <main className={styles.main}>
                <h1> gráfico AMZN_GOOGL para mostrarlo en el cliente con todos los items</h1>
                {dataFromJSON && < GraphicLayout info={dataFromJSON}/>}
            </main>
        </PageLayout>
    )
}

export async function getServerSideProps() {
    let data
    try {
        data = await getDataFromJSON();
    } catch (error) {
        return {
            notFound: true
        }
    }

    if (!data) {
        return {
            notFound: true
        }
    }
    
    return {
        props: {
            data
        }
    }
}