import { Buttons } from './user-interface.constants';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss'],
})
export class UserInterfaceComponent implements OnInit {
  constructor() {}
  buttons = Buttons;
  otherDisplay = '';
  mainDisplay = '';
  firstDigit: number;
  secondDigit: number;
  togetherDigit = 'null';
  calculationString = 'null';
  answered: boolean;
  togetherDigitSet: boolean;

  ngOnInit(): void {}

  haveValue(name: string) {
    console.log('name: ', name);
    if (
      name === '%' ||
      name === '÷' ||
      name === 'x' ||
      name === '-' ||
      name === '+'
    ) {
      const lastButton = this.mainDisplay[this.mainDisplay.length - 1];
      if (
        lastButton === '%' ||
        lastButton === '÷' ||
        lastButton === 'x' ||
        lastButton === '-' ||
        lastButton === '+'
      ) {
        this.togetherDigitSet = true;
      }

      if (this.togetherDigitSet || this.mainDisplay === '') {
        return this.haveValue;
      }
      this.firstDigit = parseFloat(this.mainDisplay);
      this.togetherDigit = name;
      this.togetherDigitSet = true;
    }
    if (this.mainDisplay.length === 10) {
      return;
    }
    console.log(this.firstDigit);
    console.log(this.secondDigit);
    if (
      name === '.' &&
      ((this.mainDisplay &&
        this.mainDisplay.includes('.') &&
        !this.secondDigit &&
        !this.firstDigit) ||
        (this.firstDigit && this.firstDigit.toString().includes('.')) ||
        (this.secondDigit && this.secondDigit.toString().includes('.')))
    ) {
      return;
    }
    this.mainDisplay += name;
    if (name === '=') {
      this.getAnswer();
    }
    if (name === 'C') {
      this.clear();
    }
    if (name === '.') {
      this.getDecimal();
    }
    if (name === '%') {
      this.getPercent();
    }
    if (name === '+/-') {
      this.getSwitcher();
    }
  }
  getAnswer() {
    this.calculationString = this.mainDisplay;
    const filtered = this.mainDisplay
      .split(this.togetherDigit)
      .filter((digit) => digit);
    this.secondDigit = parseFloat(filtered[1]);
    if (this.togetherDigit === '÷') {
      this.otherDisplay = this.mainDisplay;
      this.mainDisplay = (this.firstDigit / this.secondDigit).toString();
      this.otherDisplay = this.calculationString;
      if (this.mainDisplay.length > 9) {
        this.mainDisplay = this.mainDisplay.substr(0, 9);
      }
    } else if (this.togetherDigit === 'x') {
      this.otherDisplay = this.mainDisplay;
      this.mainDisplay = (this.firstDigit * this.secondDigit).toString();
      this.otherDisplay = this.calculationString;
      if (this.mainDisplay.length > 9) {
        this.mainDisplay = 'YomaYo';
        this.otherDisplay = 'too many bro';
      }
    } else if (this.togetherDigit === '-') {
      this.otherDisplay = this.mainDisplay;
      this.mainDisplay = (this.firstDigit - this.secondDigit).toString();
      this.otherDisplay = this.calculationString;
    } else if (this.togetherDigit === '+') {
      this.otherDisplay = this.mainDisplay;
      this.mainDisplay = (this.firstDigit + this.secondDigit).toString();
      this.otherDisplay = this.calculationString;
      if (this.mainDisplay.length > 9) {
        this.mainDisplay = 'YomaYo';
        this.otherDisplay = 'too many bro';
      }
    } else {
      this.otherDisplay = "don't complicate bro";
    }
    this.answered = true;
    this.togetherDigitSet = false;
  }

  clear() {
    this.otherDisplay = '';
    this.firstDigit = null;
    this.togetherDigit = null;
    this.mainDisplay = '';
    this.togetherDigitSet = false;
  }

  getDecimal() {
    console.log('work');
    // const lastButton = this.mainDisplay[this.mainDisplay.length - 1];

    // if (this.mainDisplay === '.' ||)
    // this.mainDisplay = '';
  }

  //   if (!this.mainDisplay.includes('.')) {
  //     return (this.mainDisplay += '.');
  //   }
  // }
  //   if (
  //     this.calculationString.includes('.') &&
  //     this.mainDisplay.includes('.')
  //   ) {
  //     return; //--
  //   }
  // }
  // if (calculationString === '.') {
  //   this.calculationString = '0' + calculationString;
  // }

  // if (num == '.') {
  //   if (this.calculationString != '') {
  //     const lastNum = this.secondDigit();
  //
  //     if (lastButton.lastIndexOf('.') >= 0) return;
  //   }

  getPercent() {
    const dispval = parseInt(this.mainDisplay, 0) / 100;
    this.mainDisplay = dispval.toString();
  }
  getSwitcher() {
    if (this.mainDisplay === '+/-') {
      this.mainDisplay = '';
    }
    if (Math.sign(parseInt(this.mainDisplay, 0)) === 1) {
      const sign = -Math.abs(parseInt(this.mainDisplay, 0));
      this.mainDisplay = sign.toString();
    } else if (Math.sign(parseInt(this.mainDisplay, 0)) === -1) {
      const sign = Math.abs(parseInt(this.mainDisplay, 0));
      this.mainDisplay = sign.toString();
    } else {
      this.mainDisplay = this.mainDisplay;
    }
  }
}
