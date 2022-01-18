import { OPTION_MARGIN_LEFT, OPTION_MARGIN_LEFT_STEP } from '../constants';
import { OptionData } from '../interfaces/interfaces';
import { Option } from '../components/option';
import { BaseComponent } from './baseComponent';
import './optionField.scss';

export class OptionField extends BaseComponent {

  public selectedValues: string[] = [];

  private optionCheckboxList: HTMLInputElement[] = [];
  
  constructor( options: OptionData[], selected?:string[] ) {
    super('div', ['option-field']);

    if (selected) this.selectedValues = selected;

    this.addOption(options, OPTION_MARGIN_LEFT);
    this.selectValues();
  }

  private addOption( 
    option:OptionData[], 
    marginLeft:number, 
    parentElement?:Option) {

    option.forEach((opt)=>{
      const newOptionElement = new Option(opt, marginLeft);

      newOptionElement.checkBox.addEventListener('change', () => 
        this.updateSelectedValues(newOptionElement.checkBox.value, 
          newOptionElement.checkBox.checked));

      this.optionCheckboxList.push(newOptionElement.checkBox);

      if (parentElement){
        newOptionElement.element.classList.add('hidden');

        parentElement.showNestedButton.addEventListener('click',
          () => newOptionElement.element.classList.toggle('hidden'));

        newOptionElement.checkBox.addEventListener('change', ()=>{
          if (newOptionElement.checkBox.checked) {
            parentElement.checkBox.checked = true;
            parentElement.checkBox.dispatchEvent(new Event('change'));
          }
        });

        parentElement.checkBox.addEventListener('change', ()=>{
          if (!parentElement.checkBox.checked) {
            newOptionElement.checkBox.checked = false;
            newOptionElement.checkBox.dispatchEvent(new Event('change'));
          }
        });
      }

      this.element.append(newOptionElement.element);

      if (opt.nestedData) {
        this.addOption(opt.nestedData,
          marginLeft + OPTION_MARGIN_LEFT_STEP, newOptionElement);
      }  
    });
  }

  private updateSelectedValues(value: string, checked:boolean) {
    if (checked) {
      this.selectedValues.push(value);
    } else {
      const optionIndex = this.selectedValues.findIndex(arrValue=> arrValue === value);
      this.selectedValues.splice(optionIndex, 1);
    }
  }

  private selectValues() {
    this.optionCheckboxList.forEach(checkbox=>{
      const selectedCheckbox = this.selectedValues.find( value => value === checkbox.value);
      if (selectedCheckbox) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  }

  public clearSelection() {
    this.selectedValues = [];
    this.selectValues();
  }
}