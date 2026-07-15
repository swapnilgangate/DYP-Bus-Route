const stops = [
  [1, 'Walwa', 'वाळवा', '35,550', '7:15 AM'],
  [2, 'Ishwarpur', 'ईश्वरपूर', '24,800', '7:40 AM'],
  [3, 'Kameri', 'कामेरी', '21,900', '7:45 AM'],
  [4, 'Eitakari Fata', 'ऐतकारी फाटा', '20,600', '7:45 AM'],
  [5, 'Yeloor Fata', 'येलूर फाटा', '19,600', '7:50 AM'],
  [6, 'Tandulwadi', 'तांदुळवाडी', '19,600', '8:00 AM'],
  [7, 'Kini Ghunaki Fata', 'किनी घुणकी फाटा', '16,100', '8:05 AM'],
  [8, 'Watar', 'वाठार', '14,300', '8:10 AM'],
  [9, 'Ambap Fata', 'आंबप फाटा', '14,300', '8:15 AM'],
  [10, 'DYPCET', 'डी. वाय. पाटील कॉलेज', '—', '8:40 AM']
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
