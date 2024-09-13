import React, { useState, useEffect } from 'react';
import RecordatorioManager from './Recordatorio';

const RecordatorioComponent = () => {
    const [manager, setManager] = useState(new RecordatorioManager());
    const [texto, setTexto] = useState('');
    const [fecha, setFecha] = useState(new Date());

    useEffect(() => {
        manager.renderizarRecordatorios = () => {
            const lista = document.getElementById('recordatorios-lista');
            lista.innerHTML = '';
            manager.verRecordatoriosActivos().forEach(recordatorio => {
                const li = document.createElement('li');
                li.textContent = `${recordatorio.texto} - ${recordatorio.fecha.toDateString()}`;
                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.onclick = () => manager.eliminarRecordatorio(recordatorio.id);
                li.appendChild(btnEliminar);
                lista.appendChild(li);
            });
        };

        manager.renderizarEliminaciones = () => {
            const lista = document.getElementById('eliminaciones-lista');
            lista.innerHTML = '';
            manager.verHistorialEliminaciones().forEach(recordatorio => {
                const li = document.createElement('li');
                li.textContent = `${recordatorio.texto} - ${recordatorio.fecha.toDateString()}`;
                lista.appendChild(li);
            });
        };
    }, [manager]);

    const agregarRecordatorio = () => {
        if (texto && fecha) {
            manager.agregarRecordatorio(texto, fecha);
        }
    };

    return (
        <div>
            <input type="text" id="texto" value={texto} onChange={e => setTexto(e.target.value)} />
            <input type="date" id="fecha" value={fecha.toISOString().split('T')[0]} onChange={e => setFecha(new Date(e.target.value))} />
            <button onClick={agregarRecordatorio}>Agregar Recordatorio</button>
            <ul id="recordatorios-lista" />
            <ul id="eliminaciones-lista" />
        </div>
    );
};

export default RecordatorioComponent;