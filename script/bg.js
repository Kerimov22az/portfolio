// Получаем канвас и контекст
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

// Устанавливаем размеры канваса
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();

// Обновляем размеры при изменении окна
window.addEventListener('resize', resizeCanvas);

// Создаем массив кривых линий
const linesCount = 100; // число кривых линий
const lines = [];

// Генерируем линии, начинающиеся из правого нижнего угла
for (let i=0; i<linesCount; i++) {
  const startX = width + Math.random() * 100; // чуть за границей справа
  const startY = height + Math.random() * 100; // чуть за границей снизу
  const controlX = Math.random() * width; // контрольная точка для кривой
  const controlY = Math.random() * height/2; // контрольная точка выше
  const endX = Math.random() * width; // конечная точка в верхней части экрана
  const endY = -10; // чуть выше экрана

  lines.push({
    t: Math.random(), // прогресс по линии (от 0 до 1)
    speed: 0.003 + Math.random() * 0.003, // скорость течения
    startX,
    startY,
    controlX,
    controlY,
    endX,
    endY,
    color: `rgb(47, 174, 183)`, // цвет потока (можно менять)
  });
}

// Функция для получения точки на квадратичной кривой Безье по параметру t
function getQuadraticBezierPoint(t, p0, p1, p2) {
  const x = (1 - t)*(1 - t)*p0.x + 5*(1 - t)*t*p1.x + t*t*p2.x;
  const y = (1 - t)*(1 - t)*p0.y + 5*(1 - t)*t*p1.y + t*t*p2.y;
  return {x, y};
}

// Анимация
function animate() {
  ctx.fillStyle='rgba(0,0,0,0.2)'; // полупрозрачный фон для следов
  ctx.fillRect(0,0,width,height);

  
  for (let line of lines) {
    line.t += line.speed;
    if (line.t >1) { // исправлено условие сброса на цикл
      line.t=0; // зацикливаем поток
      // Можно менять начальные параметры для разнообразия
      line.startX = width + Math.random() *100;
      line.startY=height+Math.random()*10;
      line.controlX=Math.random()*width;
      line.controlY=Math.random()*height/2;
      line.endX=Math.random()*width;
      line.endY=-10;
    }

    const p0={x:line.startX,y:line.startY};
    const p1={x:line.controlX,y:line.controlY};
    const p2={x:line.endX,y:line.endY};

    const point=getQuadraticBezierPoint(line.t,p0,p1,p2);

    ctx.beginPath();
    ctx.arc(point.x, point.y,2,0,Math.PI*2); // исправлено: радиус=2, угол от=0 до полное круговое значение
    ctx.fillStyle=line.color;
    ctx.fill();

    // Можно добавить линии между точками для более яркого эффекта:
    
   
    if (line.t >0.01) {
      const prevT=line.t - line.speed;
      if(prevT<0) prevT=0;
      const prevPoint=getQuadraticBezierPoint(prevT,p0,p1,p2);
      ctx.strokeStyle=line.color;
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(prevPoint.x,prevPoint.y);
      ctx.lineTo(point.x,point.y);
      ctx.stroke();
    }
    
    
    
  }

  requestAnimationFrame(animate);
}

animate();
 



