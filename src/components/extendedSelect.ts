import { newElem } from '../functions/newElem';
import { SelectData } from '../interfaces/interfaces';
import { BaseComponent } from './baseComponent';
import './extendedSelect.scss';
import { OptionField } from './optionField';

export class ExtendedSelect extends BaseComponent {
  private header: HTMLElement;

  private optionField: OptionField;

  private footer: HTMLElement;

  private controls: HTMLElement;

  private title: HTMLElement;

  private titleBackButton: HTMLElement;

  private selectedCounter: HTMLElement;

  private selectField: HTMLInputElement;

  private selecthidden: HTMLSelectElement;

  private submitButton:HTMLElement;

  private clearButton: HTMLElement;

  constructor(selectData: SelectData, selected?:string[]) {
    super('div', ['extended-select']);

    this.header = newElem('div', ['extended-select__header']);
    this.optionField = new OptionField(selectData.options, selected || []);
    this.footer = newElem('div', ['extended-select__footer']);

    this.controls = newElem('div', ['extended-select__controls']);
    this.title = newElem('label', ['extended-select__controls__title'], selectData.title);
    this.titleBackButton = newElem('div', ['extended-select__controls__title__back-button']);
    this.title.prepend(this.titleBackButton);
    this.selectedCounter = newElem('span', ['extended-select__controls__counter']);

    this.controls.append(this.title, this.selectedCounter);

    this.selectField = newElem('input', ['extended-select__mainField']) as HTMLInputElement;
    this.selectField.placeholder = selectData.title;

    this.submitButton = newElem('div', ['extended-select__footer__button-submit'], 'ПРИНЯТЬ');
    this.submitButton.onclick = () => {
      this.updateSelect(this.optionField.selectedValues);
      this.collapse();
    };

    this.clearButton = newElem('div', ['extended-select__footer__button-clear'], 'Очистить');
    this.clearButton.onclick = () => this.cancelSelection();
    const footerWrapper = newElem('div', ['extended-select__footer__wrapper']);
    footerWrapper.append(this.submitButton, this.clearButton);

    this.header.append(this.controls, this.selectField);
    this.footer.append(footerWrapper);
    

    this.selectField.onclick = () => this.show();
    this.titleBackButton.onclick = () => this.collapse();
    this.selectedCounter.onclick = () => this.show();
    
    this.selecthidden = selectData.element;

    this.collapse();
  }

  private clear():void {
    this.element.innerHTML = '';
  }

  private collapse():void {
    this.clear();
    this.element.classList.remove('show');
    this.element.append(this.header);
  }

  private show():void {
    this.element.classList.add('show');
    this.element.append(this.optionField.element, this.footer);
  }

  private clearSelect() {
    for (const option of this.selecthidden.options){
      option.selected = false;
    }
  }

  private findOptionbyValue(value:string):number | undefined{
    for (const option of this.selecthidden.options){
      if (option.value === value) {
        return option.index;
      }
    }
  }

  private updateSelectField(){
    const selectedOptionsNames = [];
    let tag = '';
    for (const option of this.selecthidden.selectedOptions){
      if (!tag) tag = option.value[0];
      if (tag !== option.value[0]) selectedOptionsNames.push(';');
      selectedOptionsNames.push(option.text);
    }
    this.selectField.value = selectedOptionsNames.join(' ');
  }

  private updateSelectedCounter(){
    this.selectedCounter.innerHTML = this.selecthidden.selectedOptions.length ?
      `Показать выбранное(${this.selecthidden.selectedOptions.length})` : '';
  }

  private updateSelect(selectedValues:string[]) {
    this.clearSelect();
    selectedValues.forEach(value=>{
      
      const index = this.findOptionbyValue(value);
      if (typeof index === 'number') {
        const option = this.selecthidden.options.item(index);
        if (option) option.selected = true;
      }
    });
    this.updateSelectField();
    this.updateSelectedCounter();
  }

  private cancelSelection(){
    this.clearSelect();
    this.optionField.clearSelection();

    this.selectField.value = '';

    this.updateSelectedCounter();
  }
}