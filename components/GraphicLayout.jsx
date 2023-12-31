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
        backgroundColor2: '#0F1C2E',
        textColor: '#1d1c1c',
        areaTopColor: '#FF3D3D',
        areaBottomColor: '#1A1F2B',

    }

    const nombreSeries = ['banda_superior','max','ratio','min','banda_inferior']
    useEffect(() => {
        const datos = info && info.data ? info.data : [];
        const sortedData = filteredData(datos)
        let chartData = {}

        if (datos && datos.length > 0) {

            chartData = {
                banda_superior: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.banda_superior
                })),
                max: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.max
                })),
                ratio: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.ratio
                })),
                min: sortedData.map(item => ({
                    time: Math.floor(new Date(item.fecha).getTime() / 1000),
                    value: item.relaciones.min
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
                background: { type: ColorType.Solid, color: colors.backgroundColor2 },
                textColor: colors.textColor,
            },
            width: chartContainerRef.current.clientWidth,
            timeScale: {
                timeVisible: true,
                secondsVisible: false
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            }
        });
        chart.timeScale().fitContent();
        
        // Define un objeto de colores para cada serie
        const seriesColors = {
            banda_superior: { color: '#bb2649', name: 'Banda Superior' },
            max: { color: '#FF6600', name: 'Max' },
            ratio: { color: '#f5f5e9', name: 'Ratio' },
            min: { color: '#25b1bf', name: 'Min' },
            banda_inferior: { color: '#005161', name: 'Banda Inferior' }
        };

        //banda_inferior color en modo dia : #151931

        // Agrega cada serie al gráfico con su color correspondiente
        let lineSeriesObject = {};

        for (const serie in chartData) {
            let lineSeries;
            if (serie === 'ratio') {
                lineSeries = chart.addLineSeries({ color: seriesColors[serie].color });
            } else {
                lineSeries = chart.addLineSeries();
                lineSeries.applyOptions({ color: seriesColors[serie].color });
            }
            lineSeries.setData(chartData[serie]);
            lineSeriesObject[serie] = lineSeries;
        }


        // Creo y le doy estilo al toolTip
        const toolTip = document.createElement('div');
        toolTip.style = `width: 200px; height: 100px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
        toolTip.style.background = '#cee8ff';
        toolTip.style.color = 'black';
        toolTip.style.borderColor = '#2962FF';
        chartContainerRef.current.appendChild(toolTip);


        // Capturo el movimiento del mouse para visualizar el toolTip
        chart.subscribeCrosshairMove(function(param) {
            if (param.point === undefined ||
                param.time === undefined ||
                param.seriesData.size === 0 ) {
                toolTip.style.display = 'none';
            } else {
                toolTip.style.display = 'block';
                toolTip.style.position = 'absolute';
                toolTip.style.left = '10px';
                toolTip.style.top = '10px';
                toolTip.innerHTML = '';
        
                for (const serie in lineSeriesObject) {
                    const data = param.seriesData.get(lineSeriesObject[serie]);
                    if (data !== undefined) {
                        // Include a colored circle for each line
                        toolTip.innerHTML += `<div><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${seriesColors[serie].color}; margin-right:5px;"></span>${seriesColors[serie].name}: ${data.value.toFixed(2)}</div>`;
                    }
                }
            }
        });
        
        
        
        chartContainerRef.current.addEventListener('mouseout', function() {
            toolTip.style.display = 'none';
        });        

        window.addEventListener('resize', handleResize);

        setIsLoading(false);

        return () => {
            /* chartContainerRef.current.removeEventListener('mouseout', () => {toolTip.style.display = 'none'});  */ 
            chart.unsubscribeCrosshairMove();
            window.removeEventListener('resize', handleResize)
            chart.remove();
        }

    }, [info])

    return (
        <>
            <article ref={chartContainerRef} className={styles.chartContainer}>
                {isLoading && <span>Cargando ...</span>}
            </article>
        </>
    )
}