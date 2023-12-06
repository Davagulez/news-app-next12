'use client'
import { createChart, ColorType } from 'lightweight-charts';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/GraphicLayout.module.css'

function filteredData(data) {
    return data.reduce((acc, current) => {
        const x = acc.find(item => Math.floor(new Date(item.fecha).getTime() / 1000) === Math.floor(new Date(current.fecha).getTime() / 1000));
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
}

export default function GraphicLayout({ info }) {
    const chartContainerRef = useRef();

    const colors = {
        backgroundColor: '#fffefb',
        textColor: '#1d1c1c',
        areaTopColor: '#FF3D3D',
        areaBottomColor: '#1A1F2B',

    }


    useEffect(() => {
        const datos = info && info.data ? info.data : [];
        let chartData = {}

        if (datos && datos.length > 0) {

            const sortedData = filteredData(datos).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

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
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: colors.backgroundColor },
                textColor: colors.textColor,
            },
            width: chartContainerRef.current.clientWidth,
            /* height: 500 */
        });
        chart.timeScale().fitContent();

        // Define un objeto de colores para cada serie
        const seriesColors = {
            ratio: '#00668c',
            max: '#c21d03',
            min: '#c21d03',
            banda_superior: '#151931',
            banda_inferior: '#151931'
        };

        // Agrega cada serie al gráfico con su color correspondiente
        for (const serie in chartData) {
            const lineSeries = chart.addLineSeries({ lineColor: seriesColors[serie] });
            lineSeries.setData(chartData[serie]);
        }


        console.log(chartData.ratio)

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.remove();
        }

    }, [info])


    return (
        <article ref={chartContainerRef} className={styles.chartContainer}></article>
    )
}