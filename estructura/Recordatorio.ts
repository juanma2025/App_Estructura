class recordatorio {
    id: number;
    texto: string;
    fecha: Date;

    constructor(id: number, texto: string, fecha: Date) {
        this.id = id;
        this.texto = texto;
        this.fecha = fecha;
    }
}

class recordatorioManager {
    private recordatorios: recordatorio[] = [];
    private historialEliminados: recordatorio[] = [];
    private idCounter: number = 0;

    agregarRecordatorio(texto: string, fecha: Date): void {
        if (texto && fecha instanceof Date && !isNaN(fecha.getTime())) {
            const nuevoRecordatorio = new recordatorio(this.idCounter++, texto, fecha);
            this.recordatorios.push(nuevoRecordatorio);
            this.renderizarRecordatorios();
        } else {
            console.error("Texto o fecha inválidos");
        }
    }

    eliminarRecordatorio(id: number): void {
        const index = this.recordatorios.findIndex(r => r.id === id);
        if (index !== -1) {
            const [eliminado] = this.recordatorios.splice(index, 1);
            this.historialEliminados.push(eliminado);
            this.renderizarRecordatorios();
            this.renderizarEliminaciones();
        }
    }

    verRecordatoriosActivos(): recordatorio[] {
        return this.recordatorios;
    }

    verHistorialEliminaciones(): recordatorio[] {
        return this.historialEliminados;
    }

    private renderizarRecordatorios(): void {
        const lista = document.getElementById('recordatorios-lista');
        if (lista) {
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
        } else {
            console.error("Elemento 'recordatorios-lista' no encontrado");
        }
    }

    private renderizarEliminaciones(): void {
        const lista = document.getElementById('eliminaciones-lista');
        if (lista) {
            lista.innerHTML = '';
            this.historialEliminados.forEach(recordatorio => {
                const li = document.createElement('li');
                li.textContent = `${recordatorio.texto} - ${recordatorio.fecha.toDateString()}`;
                lista.appendChild(li);
            });
        } else {
            console.error("Elemento 'eliminaciones-lista' no encontrado");
        }
    }
}

const Manager = new recordatorioManager();

function agregarrecordatorio(): void {
    const texto = (document.getElementById('texto') as HTMLInputElement).value;
    const fechaInput = (document.getElementById('fecha') as HTMLInputElement).value;
    const fecha = new Date(fechaInput);
    if (texto && fechaInput && !isNaN(fecha.getTime())) {
        Manager.agregarRecordatorio(texto, fecha);
    } else {
        console.error("Texto o fecha inválidos");
    }
}
