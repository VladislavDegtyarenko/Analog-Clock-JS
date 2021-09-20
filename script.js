document.addEventListener('DOMContentLoaded', () => {
	const clocks = document.querySelectorAll('.clock');
	const modeSwitcher = document.querySelector('.mode'),
		background = document.querySelector('.background'),
		root = document.documentElement;

	let darkMode = false;
	modeSwitcher.addEventListener('click', () => {
		if (!darkMode) {
			modeSwitcher.classList.add('active');
			background.classList.add('dark');

			root.style.setProperty('--color-2', '#ffffff');
			root.style.setProperty('--color-1', '#242424');
		} else {
			modeSwitcher.classList.remove('active');
			background.classList.remove('dark');

			root.style.setProperty('--color-1', '#ffffff');
			root.style.setProperty('--color-2', '#242424');
		}
		darkMode = !darkMode;
	});

	clocks.forEach((clock) => {
		const utcOffset = clock.getAttribute('data-utc-offset');
		initClock(clock, utcOffset);
	});

	function initClock(clock, utcOffset) {
		const dotsWrapper = clock.querySelector('.dots'),
			hourDigitsWrapper = clock.querySelector('.hours-wrapper'),
			cityWrapper = clock.querySelector('.city'),
			cityName = clock.getAttribute('data-city');

		initClockDots(dotsWrapper);
		initHourDigits(hourDigitsWrapper);
		cityWrapper.textContent = cityName;

		updateClock(clock, utcOffset);

		setInterval(() => {
			updateClock(clock, utcOffset);
		}, 50);
	}

	function initClockDots(dotsWrapper) {
		for (let i = 0; i < 60; i++) {
			let dot = document.createElement('div');
			dot.style.transform = `rotate(${45 + i * 6}deg)`;
			dotsWrapper.append(dot);
		}
	}

	function initHourDigits(hourDigitsWrapper) {
		for (let i = 0; i < 12; i++) {
			let hourContainer = document.createElement('div');
			let hourNum = document.createElement('p');
			hourNum.textContent = i + 1;

			hourContainer.style.transform = `rotate(${75 + i * 30}deg)`;
			hourNum.style.transform = `rotate(${-75 - i * 30}deg)`;

			hourContainer.append(hourNum);
			hourDigitsWrapper.append(hourContainer);
		}
	}

	function updateClock(clock, utcOffset) {
		let date = new Date();
		let hours = date.getUTCHours() + +utcOffset;
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		const hourHand = clock.querySelector('.arrow-hour'),
			minuteHand = clock.querySelector('.arrow-minute'),
			secondHand = clock.querySelector('.arrow-second');

		/*       let fullDate = date.toLocaleDateString("en-GB", {
         weekday: "long",
         year: "numeric",
         month: "short",
         day: "numeric",
      }); */

		hourHand.style.transform = `rotate(${180 + (hours + minutes / 60) * 30}deg)`;
		minuteHand.style.transform = `rotate(${180 + (minutes + seconds / 60) * 6}deg)`;
		secondHand.style.transform = `rotate(${180 + seconds * 6}deg)`;
		//dateTextDiv.textContent = fullDate;
	}
});
