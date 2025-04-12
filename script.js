const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 'Presente Misterioso' },
  { minDegree: 31, maxDegree: 90, value: '10 reais' },
  { minDegree: 91, maxDegree: 150, value: '100 reais no pix' },
  { minDegree: 151, maxDegree: 210, value: '50 reais no pix' },
  { minDegree: 211, maxDegree: 270, value: '200 reais no pix' },
  { minDegree: 271, maxDegree: 330, value: 'Nada' },
  { minDegree: 331, maxDegree: 360, value: 'Presente Misterioso' },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ['10 reais','Presente','100 reais ','50 reais', '200 reais ','Nada'],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 16 },
      },
    },
  },
});

let rotationAngle = 0; // Inicialização da rotação da roleta

// Função para atualizar a rotação do texto de acordo com a rotação da roleta
function updateTextRotation(angle) {
  const numSegments = 6; // Número de segmentos na roleta
  const segments = document.querySelectorAll('.text-container span');

  // A rotação de cada texto depende da rotação da roleta
  segments.forEach((span, index) => {
    // Calcula a rotação do texto, levando em consideração a rotação da roleta e a posição do texto
    let textRotation = (angle + (index * (360 / numSegments))) % 360;
    
    // Define a rotação para o texto
    span.style.transform = `rotate(${textRotation}deg)`;
  });
}

// Função de rotação da roleta
function rotateWheel() {
  rotationAngle += 45; // A rotação da roleta, ajuste conforme necessário
  updateTextRotation(rotationAngle);
}

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Resultado: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};



//Spiner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
        finalValue.innerHTML = `<p>Que Deus te ajude!</p>`;
    
  // Force randomDegree to always fall within the range for value 2
    let randomDegree = Math.random() < 0.5 
      ? Math.floor(Math.random() * (30 - 0 + 1) + 0) // Range 0-30
      : Math.floor(Math.random() * (360 - 331 + 1) + 331); // Range 331-360
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
      //Set rotation for piechart
      myChart.options.rotation = myChart.options.rotation + resultValue;
      //Update chart with new value;
      myChart.update();
      //If rotation>360 reset it back to 0
      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      }
      
      else if (count > 15 && myChart.options.rotation == randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  });