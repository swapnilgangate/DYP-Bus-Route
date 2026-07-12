const stops = [
  [1, 'Ashta', 'आष्टा', '18,900', '7:45 AM'],
  [2, 'Bagani', 'बागणी', '17,200', '7:55 AM'],
  [3, 'Shigaon', 'शिगाव', '15,500', '8:05 AM'],
  [4, 'Bhadole', 'भाडोळे', '13,800', '8:10 AM'],
  [5, 'DYPCET', 'डी. वाय. पाटील कॉलेज', '—', '8:40 AM']
];

document.querySelector('#route-stops').innerHTML = stops.map(([number, english, marathi, fee, time], index) => `
  <tr class="${index === stops.length - 1 ? 'final-stop' : ''}">
    <td>${String(number).padStart(2, '0')}</td>
    <td><span class="stop-name">${english}</span><span class="marathi">${marathi}</span></td>
    <td class="fee">${fee === '—' ? fee : `₹${fee}`}</td>
    <td class="time">${time}</td>
  </tr>`).join('');

const routeVisual = document.querySelector('.route-visual');
const stopPopup = document.querySelector('.stop-popup');
const animatedStopName = document.querySelector('#animated-stop-name');
const animatedStopTime = document.querySelector('#animated-stop-time');
const animatedStopFee = document.querySelector('#animated-stop-fee');
const positions = stops.map((_, index) => 7 + (index * 81) / (stops.length - 1));
const pauseAtStop = 1800;
const driveToStop = 900;

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

async function runRoute() {
  while (true) {
    for (let index = 0; index < stops.length; index += 1) {
      const [, english, , fee, time] = stops[index];
      stopPopup.classList.remove('visible');
      routeVisual.style.setProperty('--route-position', positions[index]);
      await wait(driveToStop);
      animatedStopName.textContent = english;
      animatedStopTime.textContent = time;
      animatedStopFee.textContent = fee === '—' ? 'Campus' : `₹${fee}`;
      stopPopup.classList.add('visible');
      await wait(pauseAtStop);
    }
    stopPopup.classList.remove('visible');
    await wait(900);
  }
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) runRoute();
