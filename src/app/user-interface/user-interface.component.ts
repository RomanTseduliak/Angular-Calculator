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
  answered = false;
  togetherDigitSet: boolean;

  ngOnInit(): void {}

  haveValue(name: string) {
    if (
      name === '%' ||
      name === '+/-' ||
      name === '÷' ||
      name === 'x' ||
      name === '-' ||
      name === '+'
    ) {
      const lastButton = this.mainDisplay[this.mainDisplay.length - 1];
      if (
        lastButton === '%' ||
        lastButton === '+/-' ||
        lastButton === '÷' ||
        lastButton === 'x' ||
        lastButton === '-' ||
        lastButton === '+'
      ) {
        this.togetherDigitSet = true;
        return; //--
      }
      if (this.togetherDigitSet || this.mainDisplay === '') {
        //return
      }
      this.firstDigit = parseFloat(this.mainDisplay);
      this.togetherDigit = name;
      this.togetherDigitSet = true;
    }
    if (this.mainDisplay.length === 10) {
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
    this.secondDigit = parseFloat(
      this.mainDisplay.split(this.togetherDigit)[1]
    );
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
  }

  clear() {
    this.otherDisplay = '';
    this.firstDigit = null;
    this.togetherDigit = null;
    // this.mainDisplay = this.calculationString.substr(
    //   0,
    //   this.calculationString.length - 1
    // );
    this.mainDisplay = '';
  }

  getDecimal() {
    if (!this.calculationString.includes('.')) {
      this.calculationString += '.';
    }
    return;
  }

  getPercent() {
    const dispval = parseInt(this.mainDisplay, 0) / 100;
    this.mainDisplay = dispval.toString();
  }
  getSwitcher() {
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
// if (character === '.') {
//   character = '0' + character;
// }
// getDecimal(){
//   if(!this.currentNumber.includes('.')){
//       this.currentNumber += '.';
//   }
// }
// if (num == '.') {
//   if (this.input != '') {
//     const lastNum = this.getLastOperand();
//     console.log(lastNum.lastIndexOf('.'));
//     if (lastNum.lastIndexOf('.') >= 0) return;
//   }

//   case '+/-':
//         if (Math.sign(parseInt(this.display, 0)) === 1) {
//           const sign = -Math.abs(parseInt(this.display, 0));
//           this.display = sign.toString();
//         } else if (Math.sign(parseInt(this.display, 0)) === -1) {
//           const sign = Math.abs(parseInt(this.display, 0));
//           this.display = sign.toString();
//         } else {
//           this.display = this.display;
