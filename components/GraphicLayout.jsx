'use client'
import { createChart } from 'lightweight-charts';
import { useState, useEffect } from 'react';

export default function GraphicLayout({ info }) {
    
    useEffect(() => {
      const chart = createChart(document.getElementById('container'));
      if (info && info.length > 0 ) {
          const lineSeries = chart.addLineSeries();
          lineSeries.setData(info.map(item => ({ time: item.fecha, value: item.relaciones.ratio }))) 
      }   
    },[])
    

    return (
        <article id='container'></article>
    )
}