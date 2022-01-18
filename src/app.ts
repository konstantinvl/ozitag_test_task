import { BaseComponent } from './components/baseComponent';
import { ExtendedSelect } from './components/extendedSelect';
import { OptionData, SelectData } from './interfaces/interfaces';

export class App extends BaseComponent {
  

  constructor() {
    super('div', ['app']);

    this.extendSelects();
  }

  private extendSelects(){
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      const selectData = this.arrangeSelectData(select);
      const extendedSelect = new ExtendedSelect(selectData);
      this.element.append(extendedSelect.element);
    });
  }


  private arrangeSelectData(select:HTMLSelectElement):SelectData {
    const { name, options } = select;

    function nestDeeper(optData:OptionData[], option:OptionData){
      const depth = optData[optData.length - 1];
      if (depth.level === (option.level - 1)) {
        depth.nestedData.push(option);
      } else {
        nestDeeper(depth.nestedData, option);
      }
    }
    
    const optionsArranged: OptionData[] = [];

    for (const option of options){
      optionsArranged.push({
        value:option.value,
        level:  Number(option.getAttribute('data-level')) || 1,
        shownValue:option.textContent || '',
        nestedData:[],
      });
    }

    const optionsWithNesting:OptionData[] = [];

    optionsArranged.forEach(opt=>{
      if (opt.level === 1){
        optionsWithNesting.push(opt);
      } else {
        nestDeeper(optionsWithNesting, opt);
      }
    });

    return {
      element: select,
      title: name,
      options: optionsWithNesting,
    };
  }
}