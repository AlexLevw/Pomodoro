class Timer {
  timerInterval: NodeJS.Timeout;
  timerElement: Element;
  timeCounter: number

  constructor() {
    this.timerInterval
    this.timerElement = document.querySelector('.timer-numbers');
    this.timeCounter;
  }

  public intiTimer(): void {
    document.querySelector('.start_btn')
    .addEventListener('click', this.startTimer);
  }

  private startTimer(event: Event): void {
    event.target.removeEventListener('click', this.startTimer);
    this.timerElement.innerHTML = this.getTimer();

    this.timerInterval = setInterval(() => {
      this.timeCounter += 1;
      this.timerElement.innerHTML = this.getTimer();
    }, 1000);

    document.querySelector('.stop_btn')
    .addEventListener('click', this.stopTimer);
  }

  private stopTimer(event: Event): void {
    event.target.removeEventListener('click', this.stopTimer);
    clearInterval(this.timerInterval);
    document.querySelector('.start_btn').addEventListener('click', this.startTimer);
  }

  private getTimer(): string {
    const secondsPerMinute = 60;
    const minutes: number = Math.trunc(this.timeCounter / secondsPerMinute);
    const seconds: number = Math.trunc(this.timeCounter % secondsPerMinute);

    return `
    ${ minutes < 10 ? `0` + minutes : minutes }:${ seconds < 10 ? `0` + seconds : seconds }
    `;
  }
}

const timer = new Timer();

timer.intiTimer();
