export interface OptionData{
  value: string;
  shownValue: string;
  level:number
  nestedData: OptionData[]
}

export interface SelectData{ 
  element:HTMLSelectElement,
  title:string,
  options: OptionData[] 
}