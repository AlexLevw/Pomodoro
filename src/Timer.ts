import { Howl } from 'howler';

export default class Timer {
  timerInterval: NodeJS.Timeout;
  timeCounter: number;
  timerElement: Element;
  startBtn: Element;
  stopBtn: Element;
  resetBtn: Element;

  constructor() {
    this.timerInterval = null;
    this.timeCounter = 1;
    this.timerElement = document.querySelector('.timer-numbers');
    this.startBtn = document.querySelector('.start_btn');
    this.stopBtn = document.querySelector('.stop_btn');
    this.resetBtn = document.querySelector('.reset_btn');
  }

  public inti(): void {
    this.startBtn.addEventListener('click', this.startTimer);
    this.resetBtn.addEventListener('click', this.resetTimer);
  }

  private startTimer = (event: Event): void => {
    event.target.removeEventListener('click', this.startTimer);
    this.setTime();

    this.timerInterval = setInterval(() => {
      if(this.timeCounter > 0) {
        this.timeCounter -= 1;
        this.setTime();
      } else {
        this.endTimer();
      }
    }, 1000);

    this.stopBtn.addEventListener('click', this.stopTimer);
  }

  private stopTimer = (): void => {
    this.stopBtn,removeEventListener('click', this.stopTimer);
    clearInterval(this.timerInterval);
    this.startBtn.addEventListener('click', this.startTimer);
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