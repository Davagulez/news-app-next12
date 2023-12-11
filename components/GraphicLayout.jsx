'use client'
import { createChart, ColorType } from 'lightweight-charts';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/GraphicLayout.module.css'
import { GraphicLoader } from '../assets/Icons'

function filteredData(data) {
    const filtered = data.reduce((acc, current) => {
        const x = acc.find(item => Math.floor(new Date(item.fecha).getTime() / 1000) === Math.floor(new Date(current.fecha).getTime() / 1000));
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    const sortedData = filtered.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    return sortedData;
}

export default function GraphicLayout({ info }) {
    const [isLoading, setIsLoading] = useState(true)
    const chartContainerRef = useRef();

    const colors = {
        backgroundColor: '#fffefb',
        textColor: '#1d1c1c',
        areaTopColor: '#FF3D3D',
        areaBottomColor: '#1A1F2B',

    }

    useEffect(() => {
        const datos = info && info.data ? info.data : [];
        const sortedData = filteredData(datos)
        let chartData = {}

        if (datos && datos.length > 0) {

            chartData = {
                ratio: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.ratio
                })),
                max: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.max
                })),
                min: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.min
                })),
                banda_superior: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.banda_superior
                })),
                banda_inferior: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.banda_inferior
                }))
            }


        }

        const handleResize = () => {
            chart.applyOptions({ 
                width: chartContainerRef.current.clientWidth
            });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: colors.backgroundColor },
                textColor: colors.textColor,
            },
            width: chartContainerRef.current.clientWidth,
            timeScale: {
                timeVisible: true,
                secondsVisible: false
            }
        });
        chart.timeScale().fitContent();

        // Define un objeto de colores para cada serie
        const seriesColors = {
            ratio: '#005461',
            max: '#FF6600',
            min: '#25b1bf',
            banda_superior: '#bb2649',
            banda_inferior: '#151931'
        };

        // Agrega cada serie al gráfico con su color correspondiente
        for (const serie in chartData) {
            let lineSeries = ({})
            if (serie === 'ratio') {
                lineSeries = chart.addLineSeries({ color: seriesColors[serie] });
            } else {
                lineSeries = chart.addLineSeries()
                lineSeries.applyOptions({ color: seriesColors[serie]})
            }
            lineSeries.setData(chartData[serie]);
        }

        window.addEventListener('resize', handleResize);
        setIsLoading(false);

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.remove();
        }

    }, [info])

    return (
        <>
            <article ref={chartContainerRef} className={styles.chartContainer}>
                {isLoading && <div>Cargando ...</div>}
            </article>   
        </>
    )
}