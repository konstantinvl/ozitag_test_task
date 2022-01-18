
import { newElem } from '../functions/newElem';
import { OptionData } from '../interfaces/interfaces';
import { BaseComponent } from './baseComponent';
import './extendedSelect.scss';

export class Option extends BaseComponent {
  public fakeCheckbox:HTMLLabelElement;

  public checkBox:HTMLInputElement;

  private label:HTMLLabelElement;

  public showNestedButton:HTMLElement;

  constructor(option:OptionData, marginleft:number){
    super('div', ['option-field__option']);

    this.checkBox = newElem('input', ['option-field__option__checkbox']) as HTMLInputElement;
    this.checkBox.type = 'checkbox';
    this.checkBox.value = option.value;
    this.checkBox.id = option.value;
    this.checkBox.addEventListener('change', () => this.toggleChange());

    this.showNestedButton = newElem('div', ['option-field__option__button']);
    this.showNestedButton.addEventListener('click',
      () => this.rotateButton());
    if (!option.nestedData.length) {this.showNestedButton.classList.add('hidden');} 

    this.label = newElem('label', ['option-field__option__label'],
      option.shownValue) as HTMLLabelElement;
    this.label.htmlFor = option.value;
    this.fakeCheckbox = newElem('label',
      ['option-field__option__fake-checkbox']) as HTMLLabelElement;
    this.fakeCheckbox.htmlFor = option.value;
    
    this.showNestedButton.style.marginLeft = `${marginleft}px`;

    this.element.append(this.fakeCheckbox, this.checkBox, this.showNestedButton, this.label);
  }

  private rotateButton() {
    if (!this.showNestedButton.style.transform) {
      this.showNestedButton.style.transform = 'rotate(180deg)'; 
    } else this.showNestedButton.style.transform = '';
  }

  private toggleChange() {
    if (this.checkBox.checked) {
      this.element.classList.add('checked');
      this.fakeCheckbox.classList.add('checked');
    } else {
      this.element.classList.remove('checked');
      this.fakeCheckbox.classList.remove('checked');
    }

  }
}