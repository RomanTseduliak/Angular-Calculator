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
  subText = '';
  mainText = '';
  operand1: number;
  operand2: number;
  operator = 'null';
  calculationString = '';
  answered = false;
  operatorSet = false;

  ngOnInit(): void {}

  haveValue(key: Object) {
    if (key === '/' || key === 'x' || key === '-' || key === '+') {
      const lastKey = this.mainText[this.mainText.length - 1];
      if (
        lastKey === '/' ||
        lastKey === 'x' ||
        lastKey === '-' ||
        lastKey === '+'
      ) {
        this.operatorSet = true;
      }
      if (this.operatorSet || this.mainText === '') {
        return;
      }
      this.operand1 = parseFloat(this.mainText);
      this.operator = this.operator;
      this.operatorSet = true;
    }
    if (this.mainText.length === 10) {
      return;
    }
    this.mainText += key;
  }

  getAnswer() {
    this.calculationString = this.mainText;
    this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);
    if (this.operator === '/') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 / this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = this.mainText.substr(0, 9);
      }
    } else if (this.operator === 'x') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 * this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = 'ERROR';
        this.subText = 'Range Exceeded';
      }
    } else if (this.operator === '-') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 - this.operand2).toString();
      this.subText = this.calculationString;
    } else if (this.operator === '+') {
      this.subText = this.mainText;
      this.mainText = (this.operand1 + this.operand2).toString();
      this.subText = this.calculationString;
      if (this.mainText.length > 9) {
        this.mainText = 'ERROR';
        this.subText = 'Range Exceeded';
      }
    } else {
      this.subText = 'ERROR: Invalid Operation';
    }
    this.answered = true;
  }
  clear() {
    if (this.calculationString != '') {
      this.calculationString = this.calculationString.substr(
        0,
        this.calculationString.length - 1
      );
    }
  }
}
