const stops = [
  [1, 'Vadgaon', 'वडगाव', '10,450', '8:00 AM'],
  [2, 'Cyrus School', 'सायरस स्कूल', '9,550', '8:10 AM'],
  [3, 'Toap Sambhapur', 'तोप संभापूर', '8,700', '8:10 AM'],
  [4, 'Chinmay Ganapati', 'चिन्मय गणपती', '7,950', '8:15 AM'],
  [5, 'Toap', 'तोप', '7,950', '8:20 AM'],
  [6, 'Shiye Fata', 'शिये फाटा', '7,950', '8:25 AM'],
  [7, 'Ram Nagar', 'राम नगर', '7,200', '8:30 AM'],
  [8, 'DYPCET', 'डी. वाय. पाटील कॉलेज', '—', '8:40 AM']
];

document.querySelector('#route-stops').innerHTML = stops.map(([number, english, marathi, fee, time], index) => `
  <tr class="${index === stops.length - 1 ? 'final-stop' : ''}"><td>${String(number).padStart(2, '0')}</td><td><span class="stop-name">${english}</span><span class="marathi">${marathi}</span></td><td class="fee">${fee === '—' ? fee : `₹${fee}`}</td><td class="time">${time}</td></tr>`).join('');

const routeVisual = document.querySelector('.route-visual');
const stopPopup = document.querySelector('.stop-popup');
const animatedStopName = document.querySelector('#animated-stop-name');
const animatedStopTime = document.querySelector('#animated-stop-time');
const animatedStopFee = document.querySelector('#animated-stop-fee');
const positions = stops.map((_, index) => 7 + (index * 81) / (stops.length - 1));
const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

async function runRoute() {
  while (true) {
    for (let index = 0; index < stops.length; index += 1) {
      const [, english, , fee, time] = stops[index];
      stopPopup.classList.remove('visible');
      routeVisual.style.setProperty('--route-position', positions[index]);
      await wait(900);
      animatedStopName.textContent = english;
      animatedStopTime.textContent = time;
      animatedStopFee.textContent = fee === '—' ? 'Campus' : `₹${fee}`;
      stopPopup.classList.add('visible');
      await wait(1800);
    }
    stopPopup.classList.remove('visible');
    await wait(900);
  }
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) runRoute();
