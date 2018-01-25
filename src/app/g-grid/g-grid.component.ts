import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GGridOption, GGridColumnOption, RowSelectEventModal, GGridColumnType } from './g-grid-modal';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/count';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/mergeMap';

import * as  moment from 'moment'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'g-grid',
  templateUrl: './g-grid.component.html',
  styleUrls: ['./g-grid.component.css']
})
export class GGridComponent implements OnInit {
  /**
   * Main Grid Option
   */
  @Input() option: GGridOption
  // tslint:disable-next-line:no-input-rename
  @Input('data-source') dataSource: Array<any>;
  // tslint:disable-next-line:no-output-rename
  @Output('on-row-select') rowSelectEventEmiiter: EventEmitter<any> = new EventEmitter();
  // selectedRowIndex: number;
  // selectedFilterColumn: GGridColumnOption = null;
  // filterData: Map<string, Observable<any>> = new Map();
  // filterText = '';
  // selectedFilterData: Array<{ value: any | null, column: GGridColumnOption }> = [];
  // gridDataSet: Observable<any>
  // columnFilterArray: Observable<Array<any>>;
  // isFilterApplied = false;

  pageData = Observable.from([1, 2, 3, 4, 5]).toArray()

  internalOptions: GGridInternalOption;

  constructor() { }

  ngOnInit() {
    console.log(this.option)

    this.InitGridOption();
    this.InitInternalOption();
    this.InitGridDataSet();
    //  this.SetColumnFilterData();
    this.ConsoleGlobalObject('ngOnInit');

  }

  InitGridOption() {
    if (this.option === undefined || this.option === null) {
      throw new Error('Invalid Option for g-gird component');
    }

    if (this.option.DataSource === undefined && this.dataSource === undefined) {
      throw new Error('Data source is undefined. Set the data-source property or set dataSouce in grid option')
    }

    if (this.dataSource === undefined || this.dataSource === null) {
      this.dataSource = this.option.DataSource;
    } else {
      this.option.DataSource = this.dataSource;
    }

  }

  InitInternalOption() {
    let internalOptions = new GGridInternalOption();

    internalOptions.FilterOption = {
      columnFilterArray: null,
      filterData: new Map(),
      filterText: '',
      isFilterApplied: false,
      selectedFilterColumn: null,
      selectedFilterData: new Array<any>()
    };
    internalOptions.PageOption = {
      pages: null,
      selectedPage: 1,
      totalPages: null,
      rowCountPerPage: this.option.PaggedGrid?
          (this.option.PageOption === undefined || this.option.PageOption === null)
              ? 5 : this.option.PageOption.PageRowCount : this.dataSource.length, // Default page row count
      maxVisiblePages: 5,
      

    };
    internalOptions.selectedRowIndex = null;
    this.internalOptions = internalOptions;
  }

  InitGridDataSet() {
    this.ConsoleGlobalObject('InitGridDataSet');
    let obs = Observable.of(this.dataSource).map(res => {
      for (let key in this.option.Columns) {
        if (this.option.Columns.hasOwnProperty(key)) {
          let col = this.option.Columns[key];

          if (col.ColumnType === GGridColumnType.DateTime) {
            let mdate = moment(res[col.Key])
            res[col.Key] = mdate.toDate()
          }
        }
      }
      return res;
    });
    this.internalOptions.SetFilterDataSet(obs);
    this.internalOptions.CalculateTotalPages(obs);
    this.internalOptions.GetGridDataSet(this.GetFilterdObservable());
  }



  GetCellData(data: any, col: GGridColumnOption) {
    // this.ConsoleGlobalObject('GetCellData');
    return this.FormatColumnValue(data[col.Key], col);
  }

  RowSelect(data, index: number) {
    // this.selectedFilterColumn = null;
    if (this.internalOptions.selectedRowIndex !== index) {
      this.internalOptions.selectedRowIndex = index;

      // tslint:disable-next-line:prefer-const
      let rowSelectEventModal: RowSelectEventModal = {
        index: index,
        rowData: data
      }
      this.rowSelectEventEmiiter.emit(rowSelectEventModal)
    }

   // this.ConsoleGlobalObject('RowSelect');
  }

  private ShowFilter(column: GGridColumnOption) {
    this.internalOptions.FilterOption.selectedFilterColumn = column;
    this.internalOptions.FilterOption.columnFilterArray = this.GetFilterArray(column);
  //  this.ConsoleGlobalObject('ShowFilter');
  }

  private HideFilter() {
    this.internalOptions.FilterOption.selectedFilterColumn = null;
    this.internalOptions.FilterOption.filterText = '';
   // this.ConsoleGlobalObject('CloseFilter');
  }

  private SetColumnFilterData() {
      this.option.Columns.forEach(col => {
          let obs = this.internalOptions.GridDataSet.switch().distinct(data => data[col.Key]).pluck(col.Key);
      this.internalOptions.FilterOption.filterData.set(col.Key, obs)
    });
   // this.ConsoleGlobalObject('SetColumnFilterData');
  }

  private GetFilterArray(col: GGridColumnOption) {

      let filterArr = this.GetFilterdObservable();
      //filterArr.subscribe(res => console.log(res));
      filterArr = filterArr.pluck(col.Key).map(d => {
      //    console.log(d)
          return this.FormatColumnValue(d, col)
      }).distinct(data => data)

    if (this.internalOptions.FilterOption.filterText !== '') {
        filterArr = filterArr.filter((d) => {
        //    console.log(d)
        return (<string>d).toString().toLowerCase().includes(this.internalOptions.FilterOption.filterText);
      })
    }
    this.ConsoleGlobalObject('GetFilterArray');
    return filterArr.toArray();
  }

  private AddRemoveFilterData(value: string, col: GGridColumnOption) {
    let index = this.internalOptions.FilterOption.selectedFilterData
      .findIndex(val => val !== null && val.value.toString().toLowerCase() === value.toString());
    // console.log(index);
    if (index >= 0) {
      this.internalOptions.FilterOption.selectedFilterData[index] = null;
    } else {
      this.internalOptions.FilterOption.selectedFilterData.push({
        value: typeof (value) === 'string' ? value.toLowerCase() : value,
        column: col
      });
    }

    this.RemoveNullFilterData();

    this.ConsoleGlobalObject('AddRemoveFilterData');
  }

  private ApplyFilter(col: GGridColumnOption) {

    this.RemoveNullFilterData();

    if (this.internalOptions.FilterOption.selectedFilterData == null || this.internalOptions.FilterOption.selectedFilterData.length <= 0) {

      this.ClearFilter(true, null);
      return;
    }

    let obs = this.GetFilterdObservable();
    this.internalOptions.SetFilterDataSet(obs.toArray());
    this.internalOptions.GetGridDataSet(obs);
    this.internalOptions.CalculateTotalPages(obs.toArray());
    this.SetColumnFilterData();
    this.internalOptions.FilterOption.isFilterApplied = true;
    this.HideFilter();
    this.ConsoleGlobalObject('ApplyFilter');
  }

  private IsChecked(filterValue) {
    let index = this.internalOptions.FilterOption.selectedFilterData
      .findIndex(val => val !== null && val.value.toString().toLowerCase() === filterValue.toString());

    if (index === -1)
      return false;

    return true
  }

  ClearFilter(all: boolean, col: GGridColumnOption) {

      if (all) {
          this.InitInternalOption();
          this.InitGridDataSet();
      //this.internalOptions.SetFilterDataSet(Observable.of(this.dataSource));
      //this.internalOptions.CalculateTotalPages(Observable.of(this.dataSource));

      //this.internalOptions.FilterOption.selectedFilterData = [];
      //this.internalOptions.FilterOption.selectedFilterColumn = null;
      //this.internalOptions.selectedRowIndex = null;
      //this.internalOptions.FilterOption.filterText = '';
      //this.internalOptions.FilterOption.isFilterApplied = false;
    //  this.SetColumnFilterData();
    } else {
      for (let key in this.internalOptions.FilterOption.selectedFilterData) {
        if (this.internalOptions.FilterOption.selectedFilterData.hasOwnProperty(key)) {
          let element = this.internalOptions.FilterOption.selectedFilterData[key];
          if (element !== null && element.column.Key === col.Key)
            this.internalOptions.FilterOption.selectedFilterData[key] = null
        }

      //  this.ApplyFilter(col)
      }

      this.ApplyFilter(col)
     
      //this.RemoveNullFilterData();
      //if (this.internalOptions.FilterOption.selectedFilterData === null
      //  || this.internalOptions.FilterOption.selectedFilterData.length === 0)
      //  this.internalOptions.FilterOption.isFilterApplied = false;
    }

    this.HideFilter();
    this.ConsoleGlobalObject('ClearFilter');
  }


  private ConsoleGlobalObject(from) {
    // console.log(from);
    // console.log({
    //   'option': this.option,
    //   'dataSource': this.dataSource,
    //   'gridDataSet': this.gridDataSet,
    //   'selectedRowIndex': this.selectedRowIndex,
    //   'selectedFilterColumn': this.internalOptions.FilterOption.selectedFilterColumn ,
    //   'selectedFilterData': this.internalOptions.FilterOption.selectedFilterData,
    //   'filterData': this.filterData,
    //   'filterText': this.internalOptions.FilterOption.filterText,
    //  'isFilterApplied':  this.isFilterApplied
    // })
  }

  private SearchColumnFilterArray(col: GGridColumnOption) {
    this.ConsoleGlobalObject('SearchColumnFilterArray');
    this.internalOptions.FilterOption.columnFilterArray = this.GetFilterArray(col)
  }

  private RemoveNullFilterData() {
    this.ConsoleGlobalObject('RemoveNullFilterData');
    this.internalOptions.FilterOption.selectedFilterData = this.internalOptions.FilterOption.selectedFilterData.filter(d => d !== null);
  }

  private FormatColumnValue(value: any, col: GGridColumnOption) {
    this.ConsoleGlobalObject('FormatColumnValue');

    if (col.ColumnType === GGridColumnType.DateTime) {
      if (col.Format !== undefined)
        value = moment(value).format(col.Format.Pattern)
    } else {
      if (col.Format !== undefined) {
        value = String(value).replace(col.Format.Pattern, col.Format.Delimiter)
      }
    }
    return String(value).trim()
  }

  private GetFilterdObservable() {

      return Observable.of(this.dataSource).mergeMap(res => {
        
          return Observable.from(res).filter(val => {

            //  console.log(val)


              let colCondition = {};
              for (let key in this.internalOptions.FilterOption.selectedFilterData) {
                  if (this.internalOptions.FilterOption.selectedFilterData.hasOwnProperty(key)) {

                      let element = this.internalOptions.FilterOption.selectedFilterData[key];

                      if (element === null)
                          continue;

                      if (colCondition[element.column.Key] === undefined) {
                          colCondition[element.column.Key] = '('
                      }

                      if (colCondition[element.column.Key] === '(') {

                          colCondition[element.column.Key] = colCondition[element.column.Key]
                              + '"' + this.FormatColumnValue(val[element.column.Key], element.column) + '"'
                              + '.toString().toLowerCase() === "' + element.value.trim() + '"';

                      } else {
                          colCondition[element.column.Key] = colCondition[element.column.Key] + ' || '
                              + '"' + this.FormatColumnValue(val[element.column.Key], element.column) + '"'
                              + '.toString().toLowerCase() === "' + element.value.trim() + '"';

                      }
                  }
              }
              let newCon = '';
              for (let key in colCondition) {
                  if (colCondition.hasOwnProperty(key)) {
                      let element = colCondition[key];
                      if (newCon === '')
                          newCon = element + ')'
                      else
                          newCon = newCon + ' &&' + element + ') '
                  }
              }

              console.log(newCon);
              if (newCon === '')
                  return true;
              // tslint:disable-next-line:no-eval
              console.log(eval(newCon));
              return eval(newCon);
          })
      });
  }


  private GotoPage(page, index) {
      console.log({ page: page, index: index });
      let currentPage= this.internalOptions.PageOption.selectedPage 

      if (page === 'first')
          currentPage = 1;
      else if (page === 'last')
          currentPage = this.internalOptions.PageOption.totalPages;
      else if (page === 'next')
          currentPage = currentPage + 1;
      else if (page == 'back')
          currentPage = currentPage - 1;
      else
          currentPage = page;


     if (currentPage <= 0)
          currentPage=1

     if (currentPage >= this.internalOptions.PageOption.totalPages + 1)
         currentPage = this.internalOptions.PageOption.totalPages;

     this.internalOptions.PageOption.selectedPage = currentPage;
     this.internalOptions.GetGridDataSet(this.GetFilterdObservable());

  }


}


export class GGridInternalOption {
  selectedRowIndex?: number;

  public GridDataSet?: Observable<any> // Data that is visible

  private FilterdDateSet?: Observable<any> // Dataset after appling the filter

  FilterOption?: {
    filterData?: Map<string, Observable<any>>;
    filterText?: string;
    selectedFilterData?: Array<{ value: any | null, column: GGridColumnOption }>;
    isFilterApplied?: boolean;
    columnFilterArray?: Observable<Array<any>>;
    selectedFilterColumn?: GGridColumnOption;
  }

  PageOption?: {
    pages?: Observable<Array<number>>;
    selectedPage?: number;
    totalPages?: number;
    rowCountPerPage?: number;
    maxVisiblePages?: number;
  }

  public SetFilterDataSet(dataSet: Observable<Array<any>>) {
    this.FilterdDateSet = dataSet;
   // this.GridDataSet = this.FilterdDateSet;
   // this.GetGridDataSet();
    //this.CalculateTotalPages();
  }

  public GetGridDataSet(filterdDataSer: Observable<any>) {

      let startIndex = (this.PageOption.selectedPage * this.PageOption.rowCountPerPage) - this.PageOption.rowCountPerPage;
      let endIndex = (this.PageOption.selectedPage * this.PageOption.rowCountPerPage) - 1;

      //console.log([startIndex, endIndex])

    // this.FilterdDateSet.subscribe(res => console.log(res));

      //var obs =this.FilterdDateSet.mergeMap(res => {
      //     // console.log(res);
      //    return Observable.from(res).filter((res, index: number) => {
      //        return index >= startIndex && index <= endIndex
      //    })
      //})


      var obs = filterdDataSer.filter((res, index: number) => {
              return index >= startIndex && index <= endIndex
          })
    

     // obs.subscribe(res => console.log(res));

      this.GridDataSet   = obs.toArray();
      //  this.GridDataSet.subscribe(res => console.log(res));
    //  return this.GridDataSet 
  }

  private SetPageDataSet()
  {

  }

  public CalculateTotalPages(dataset: Observable<any>) {
  //    var prom = this.FilterdDateSet.toPromise();


      dataset.switch().count().subscribe(res => {
          console.log(res);
          this.PageOption.totalPages = Math.ceil(res / this.PageOption.rowCountPerPage);
          this.PageOption.pages = Observable.range(1, this.PageOption.totalPages).toArray();
          //console.log(res);
          //console.log(this.PageOption);
      });
  }

  public GetPageingData(currentPage: number)
  {
      if (currentPage === null)
          currentPage = 1;

      let navStartDate = 1;

      
  }

}

