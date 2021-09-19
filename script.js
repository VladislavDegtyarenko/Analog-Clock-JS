document.addEventListener('DOMContentLoaded', () => {
	const clock = document.querySelector('.clock'),
		dots = clock.querySelector('.dots'),
		hoursWrapper = clock.querySelector('.hours-wrapper');

	for (let i = 0; i < 60; i++) {
		let dot = document.createElement('div');
		dot.style.transform = `rotate(${45 + i * 6}deg)`;
		dots.append(dot);
	}

	for (let i = 0; i < 12; i++) {
		let hourContainer = document.createElement('div');
		let hourNum = document.createElement('p');
		hourNum.textContent = i + 1;

		hourContainer.style.transform = `rotate(${75 + i * 30}deg)`;
		hourNum.style.transform = `rotate(${-75 - i * 30}deg)`;

		hourContainer.append(hourNum);

		hoursWrapper.append(hourContainer);
	}

	const hourHand = clock.querySelector('.arrow-hour');
	const minuteHand = clock.querySelector('.arrow-minute');
	const secondHand = clock.querySelector('.arrow-second');
	const dateTextDiv = clock.querySelector('.date-text');

	function updateClock() {
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		let milliseconds = date.getMilliseconds();

		let fullDate = date.toLocaleDateString('en-GB', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});

		hourHand.style.transform = `rotate(${180 + (hours + minutes / 60) * 30}deg)`;
		minuteHand.style.transform = `rotate(${180 + (minutes + seconds / 60) * 6}deg)`;
		secondHand.style.transform = `rotate(${180 + (seconds + milliseconds / 1000) * 6}deg)`;
		dateTextDiv.textContent = fullDate;
	}
	updateClock();

	setInterval(updateClock, 20);
});
