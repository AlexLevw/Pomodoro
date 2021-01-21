import { Howl } from 'howler';

export default class Timer {
  timeCounter: number;
  timerStatus: string;
  timerElement: Element;
  startStopBtn: Element;
  resetBtn: Element;

  constructor() {
    this.timeCounter = 25 * 60;
    this.timerStatus = 'stopped';
    this.timerElement = document.querySelector('.timer-numbers');
    this.startStopBtn = document.querySelector('.start-stop');
    this.resetBtn = document.querySelector('.reset_btn');
  }

  public inti(): void {
    this.startStopBtn.addEventListener('click', this.startTimer);
    this.resetBtn.addEventListener('click', this.resetTimer);
    this.setTime();
  }

  private startTimer = (event: Event): void => {
    event.target.removeEventListener('click', this.startTimer);
  
    this.timerStatus = 'started';

    const interval: number = 1000;
    let expected: number = new Date().getTime() + interval;

    function step(): void {
      const dt = new Date().getTime() - expected;

      if (this.timeCounter > 0 && this.timerStatus === 'started') {
        this.timeCounter -= 1;
        this.setTime();
        expected += interval;
        setTimeout(step.bind(this), Math.max(0, interval - dt));
      } else if (this.timerStatus === 'stopped') {
        this.stopTimer();
      } else {
        console.log(this.timerStatus)
        this.endTimer();
      }
    }

    setTimeout(step.bind(this), interval);

    this.startStopBtn.textContent = 'Stop';
    this.startStopBtn.classList.add('active');
    this.startStopBtn.addEventListener('click', this.stopTimer);
  }

  private stopTimer = (): void => {
    this.startStopBtn.removeEventListener('click', this.stopTimer);

    this.timerStatus = 'stopped';

    this.startStopBtn.textContent = 'Start';
    this.startStopBtn.classList.remove('active');
    this.startStopBtn.addEventListener('click', this.startTimer);
  }

  private setTime = (): void => {
    const secondsPerMinute = 60;
    const minutes: number = Math.trunc(this.timeCounter / secondsPerMinute);
    const seconds: number = Math.trunc(this.timeCounter % secondsPerMinute);
    const formattedTime: string = `
      ${ minutes < 10 ? `0` + minutes : minutes }:${ seconds < 10 ? `0` + seconds : seconds }
    `;
    document.title = formattedTime + ' - pomodoro';
    this.timerElement.innerHTML = formattedTime;
  }

  private endTimer = (): void => {
    this.stopTimer();
    const entSound = new Howl({
      src: ['./endTimer.mp3']
    });
    entSound.play()
    setTimeout(() => {
      entSound.stop()
    }, 5000);
  }

  private resetTimer = (): void => {
    this.stopTimer();
    this.timeCounter = 25 * 60;
    this.setTime();
  } 
}