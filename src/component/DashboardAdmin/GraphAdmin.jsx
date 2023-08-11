import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js"; // Importamos Chart además de CategoryScale

// Registramos la escala "category"
CategoryScale.id = "category";
CategoryScale.defaults = {
  // ... configuración por defecto de la escala "category"
};
CategoryScale.prototype.parse = (raw, axis) => raw; // Personaliza el parsing si es necesario

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio","agosto","septiembre","octubre","noviembre","diciembre"],
  datasets: [
    {
      label: "Grafico De Ventas",
      data: [1000, 100, 9, 12,15, 18, 10000],
      backgroundColor: "aqua",
      borderColor: "black",
      pointBorderColor: 'rgb(75, 192, 192)',
      fill:true
    },
  ],
};

const options = {
    plugins : {
        legend:true
    },
    scales:{
        y:{
            min:3,
            max:21
        }
    }
}

const GraphAdmin = () => {
  return (
    <div>
      <h2>Grafico De Ventas</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraphAdmin;
