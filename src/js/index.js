(function () {
    const stopWatch = {
        appTimerElement: document.querySelector('.app__timer'),
        startButtonElement: document.querySelector('.app__controls__start'),
        lapButtonElement: document.querySelector('.app__controls__lap'),
        ulLapELement: document.querySelector('.app__laps'),
        timerId: null,
        miliseconds: 0,
        seconds: 0,
        minutes: 0,
        currentLap: 0,
        init() {
            this.addEventListeners();
        },
        addEventListeners() {
            this.startButtonElement.addEventListener('click', (evt) => {
                this.playTimer(evt);
            })
            this.lapButtonElement.addEventListener('click', () => {
                this.displayLap();
            })
        },
        playTimer(evt) {
            if (!evt.currentTarget.classList.contains('running')) {
                this.timerId = setInterval(() => {
                    this.updateTimer();
                }, 10);
                evt.currentTarget.classList.add('running');
                evt.currentTarget.textContent = 'stop';
                this.lapButtonElement.textContent = 'Tour';
            } else {
                evt.currentTarget.classList.remove('running');
                evt.currentTarget.textContent = 'Démarrer';
                this.lapButtonElement.textContent = 'Effacer';
                clearInterval(this.timerId);
            }
        },
        displayLap() {
            this.currentLap++
            if (this.timerId !== null && this.startButtonElement.classList.contains('running')) {
                this.ulLapELement.insertAdjacentHTML('afterbegin', `<li class="app__lap">
                                                                <span class="app__lap-count">${this.currentLap}</span>
                                                                <time class="app__lap-value" datatype="${this.appTimerElement.textContent}">${this.appTimerElement.textContent}</time>
                                                                </li>`
                )
            }
            if (!this.startButtonElement.classList.contains('running')) {
                this.resetTimer();
            }
        },
        addZero(time) {
            if (time < 10) {
                return '0';
            } else {
                return '';
            }
        },

        updateTimer() {
            this.miliseconds++;
            if (this.miliseconds === 100) {
                this.miliseconds = 0;
                this.seconds++;
            }
            if (this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
            }
            this.appTimerElement.textContent = `${this.addZero(this.minutes)}${this.minutes}:${this.addZero(this.seconds)}${this.seconds},${this.addZero(this.miliseconds)}${this.miliseconds}`;
            this.appTimerElement.dateTime = this.appTimerElement.textContent;
        },
        resetTimer() {
            this.miliseconds = 0;
            this.seconds = 0;
            this.minutes = 0;
            this.currentLap = 0;
            clearInterval(this.timerId);
            this.ulLapELement.innerHTML = "";
            this.appTimerElement.textContent = `${this.addZero(this.minutes)}${this.minutes}:${this.addZero(this.seconds)}${this.seconds},${this.addZero(this.miliseconds)}${this.miliseconds}`;
        }
    }
    stopWatch.init();
})();
