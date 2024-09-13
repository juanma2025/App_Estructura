class Recordatorio {
    constructor(id, texto, fecha) {
        this.id = id;
        this.texto = texto;
        this.fecha = fecha;
    }
}

class RecordatorioManager {
    constructor() {
        this.recordatorios = [];
        this.historialEliminados = [];
        this.idCounter = 0;
    }

    agregarRecordatorio(texto, fecha) {
        const nuevoRecordatorio = new Recordatorio(this.idCounter++, texto, fecha);
        this.recordatorios.push(nuevoRecordatorio);
        this.renderizarRecordatorios();
    }

    eliminarRecordatorio(id) {
        const index = this.recordatorios.findIndex(r => r.id === id);
        if (index !== -1) {
            const [eliminado] = this.recordatorios.splice(index, 1);
            this.historialEliminados.push(eliminado);
            this.renderizarRecordatorios();
            this.renderizarEliminaciones();
        }
    }

    verRecordatoriosActivos() {
        return this.recordatorios;
    }

    verHistorialEliminaciones() {
        return this.historialEliminados;
    }

    renderizarRecordatorios() {
        const lista = document.getElementById('recordatorios-lista');
        lista.innerHTML = '';
        this.recordatorios.forEach(recordatorio => {
            const li = document.createElement('li');
            li.textContent = `${recordatorio.texto} - ${recordatorio.fecha.toDateString()}`;
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.onclick = () => this.eliminarRecordatorio(recordatorio.id);
            li.appendChild(btnEliminar);
            lista.appendChild(li);
        });
    }

    renderizarEliminaciones() {
        const lista = document.getElementById('eliminaciones-lista');
        lista.innerHTML = '';
        this.historialEliminados.forEach(recordatorio => {
            const li = document.createElement('li');
            li.textContent = `${recordatorio.texto} - ${recordatorio.fecha.toDateString()}`;
            lista.appendChild(li);
        });
    }
}

const manager = new RecordatorioManager();

function agregarRecordatorio() {
    const texto = document.getElementById('texto').value;
    const fecha = new Date(document.getElementById('fecha').value);
    if (texto && fecha) {
        manager.agregarRecordatorio(texto, fecha);
    }
}
