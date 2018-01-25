import { Component, OnInit } from '@angular/core';

import { GGridOption, GGridDataSourceType, GGridColumnType } from './g-grid/g-grid-modal';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private option: GGridOption;
  obs: Observable<any>;
  obs2: Observable<any>;

  arr = [{
    name: 'ishak',
    age: 27
  }, {
    name: 'ishak',
    age: 27
  }, {
    name: 'ishak2',
    age: 27
  }];
  //#region hardCoded
  //private dataSource =
  //[{
  //  'fname': 'ahamed',
  //  'lname': 'ishak',
  //  'age': 20,
  //  'mobile': '0112354252',
  //  'cdate': new Date(2017, 10, 10)
  //},
  //{
  //  'fname': 'sadun',
  //  'lname': 'kumara',
  //  'age': 20,
  //  'mobile': '0112354568',
  //  'cdate': new Date(2017, 9, 5)
  //},
  //{
  //  'fname': 'richard',
  //  'lname': 'cbcd',
  //  'age': 54,
  //  'mobile': '0112354568',
  //  'cdate': new Date(2017, 1, 4)
  //},
  //{
  //  'fname': 'trew',
  //  'lname': 'kjuyt',
  //  'age': 98,
  //  'mobile': '9854256210',
  //  'cdate': new Date(2017, 1, 4)

  //},
  //{
  //  'fname': 'ttt',
  //  'lname': 'jjff',
  //  'age': 76,
  //  'mobile': '3456432134',
  //  'cdate': Date.now()

  //}, {
  //  'fname': 'aa',
  //  'lname': 'cbvvcd',
  //  'age': 76,
  //  'mobile': '3425356789',
  //  'cdate': new Date(2017, 9, 27)
  //}

  //]

  private dataSource = [
      {
          "id": "59f9608f9d31c651bdda049f",
          "fname": "Gail ",
          "lname": "Norman",
          "age": 38,
          "mobile": "+1 (959) 499-3115",
          "cdate": "2016-08-06T10:53:44"
      },
      {
          "id": "59f9608fb91015d1da768035",
          "fname": "Shawna ",
          "lname": "Carr",
          "age": 38,
          "mobile": "+1 (834) 486-3437",
          "cdate": "2015-03-16T12:06:21"
      },
      {
          "id": "59f9608fef2f57405d81330d",
          "fname": "Farley ",
          "lname": "Davenport",
          "age": 33,
          "mobile": "+1 (885) 526-2651",
          "cdate": "2014-07-25T10:27:24"
      },
      {
          "id": "59f9608f2bfbc4e1522b3069",
          "fname": "Leila ",
          "lname": "Leach",
          "age": 21,
          "mobile": "+1 (850) 480-3840",
          "cdate": "2014-12-27T03:23:54"
      },
      {
          "id": "59f9608f469e658e005be119",
          "fname": "Emilia ",
          "lname": "Tyler",
          "age": 25,
          "mobile": "+1 (817) 406-3508",
          "cdate": "2015-04-09T11:00:32"
      },
      {
          "id": "59f9608f59c96a9ccc67c90e",
          "fname": "Ramona ",
          "lname": "Shields",
          "age": 30,
          "mobile": "+1 (894) 484-3417",
          "cdate": "2014-12-17T10:40:46"
      },
      {
          "id": "59f9608f51fdd45de46626ee",
          "fname": "Carr ",
          "lname": "Ortega",
          "age": 35,
          "mobile": "+1 (971) 539-3752",
          "cdate": "2016-06-27T05:58:40"
      },
      {
          "id": "59f9608f7c046d5e21271248",
          "fname": "Rich ",
          "lname": "Allen",
          "age": 31,
          "mobile": "+1 (986) 499-3268",
          "cdate": "2015-09-29T10:08:14"
      },
      {
          "id": "59f9608f2e20b9e730f6a07f",
          "fname": "Summers ",
          "lname": "Castillo",
          "age": 34,
          "mobile": "+1 (929) 449-2966",
          "cdate": "2016-07-12T06:03:49"
      },
      {
          "id": "59f9608f70b7c3197999247b",
          "fname": "Shaw ",
          "lname": "Molina",
          "age": 26,
          "mobile": "+1 (832) 568-3352",
          "cdate": "2014-12-31T07:12:13"
      },
      {
          "id": "59f9608f55e2f3888656df37",
          "fname": "Dillard ",
          "lname": "Barron",
          "age": 36,
          "mobile": "+1 (925) 479-3635",
          "cdate": "2014-09-14T01:09:30"
      },
      {
          "id": "59f9608fbb896213f9e892fd",
          "fname": "Celeste ",
          "lname": "Montgomery",
          "age": 21,
          "mobile": "+1 (914) 448-2539",
          "cdate": "2016-07-15T05:36:20"
      },
      {
          "id": "59f9608f34df0a15e7d208e2",
          "fname": "Maynard ",
          "lname": "Coffey",
          "age": 26,
          "mobile": "+1 (971) 463-3309",
          "cdate": "2017-05-19T11:07:54"
      },
      {
          "id": "59f9608f410681a454605979",
          "fname": "Marta ",
          "lname": "Dyer",
          "age": 25,
          "mobile": "+1 (937) 494-2318",
          "cdate": "2014-02-04T07:13:40"
      },
      {
          "id": "59f9608ff9315271dce7fe9c",
          "fname": "Sparks ",
          "lname": "Norris",
          "age": 21,
          "mobile": "+1 (914) 430-3298",
          "cdate": "2017-08-14T12:02:38"
      },
      {
          "id": "59f9608f78550525a72d98cf",
          "fname": "Bertha ",
          "lname": "Hurst",
          "age": 30,
          "mobile": "+1 (877) 401-2599",
          "cdate": "2016-08-06T09:47:38"
      },
      {
          "id": "59f9608fa29cf694c39196b9",
          "fname": "Maryanne ",
          "lname": "Adams",
          "age": 34,
          "mobile": "+1 (870) 495-2980",
          "cdate": "2015-01-11T09:59:04"
      },
      {
          "id": "59f9608f0cff33865c88418d",
          "fname": "Colleen ",
          "lname": "Livingston",
          "age": 25,
          "mobile": "+1 (866) 600-2218",
          "cdate": "2015-07-10T01:32:33"
      },
      {
          "id": "59f9608fb607811be165a9c3",
          "fname": "Valdez ",
          "lname": "Cochran",
          "age": 24,
          "mobile": "+1 (981) 471-3449",
          "cdate": "2015-09-01T11:41:05"
      },
      {
          "id": "59f9608f274a77296d40cbbb",
          "fname": "Robert ",
          "lname": "Manning",
          "age": 31,
          "mobile": "+1 (937) 477-2576",
          "cdate": "2017-05-06T10:47:21"
      },
      {
          "id": "59f9608f8c024c99f7d9b70b",
          "fname": "Aurora ",
          "lname": "Smith",
          "age": 40,
          "mobile": "+1 (951) 443-2063",
          "cdate": "2015-08-24T07:48:36"
      },
      {
          "id": "59f9608ffdca10c2bb1a7aa3",
          "fname": "Weaver ",
          "lname": "Barnett",
          "age": 26,
          "mobile": "+1 (967) 483-2799",
          "cdate": "2014-08-03T09:43:20"
      },
      {
          "id": "59f9608f09721f86627577e8",
          "fname": "Blanche ",
          "lname": "Long",
          "age": 36,
          "mobile": "+1 (811) 401-2394",
          "cdate": "2016-07-31T06:22:48"
      },
      {
          "id": "59f9608ff84aecd9c1567407",
          "fname": "Jacqueline ",
          "lname": "Snyder",
          "age": 38,
          "mobile": "+1 (824) 593-2304",
          "cdate": "2014-12-08T05:05:02"
      },
      {
          "id": "59f9608fcd056062ee6fd682",
          "fname": "Sanford ",
          "lname": "Mcbride",
          "age": 30,
          "mobile": "+1 (888) 477-2084",
          "cdate": "2015-10-03T10:01:12"
      },
      {
          "id": "59f9608f371069ee3cf18245",
          "fname": "Rowe ",
          "lname": "Garner",
          "age": 34,
          "mobile": "+1 (806) 576-2747",
          "cdate": "2014-11-05T07:19:05"
      },
      {
          "id": "59f9608f9bfdb22e3891f102",
          "fname": "Sims ",
          "lname": "Hines",
          "age": 38,
          "mobile": "+1 (926) 500-3792",
          "cdate": "2015-06-27T07:05:40"
      },
      {
          "id": "59f9608f933be5842159b7f6",
          "fname": "Delores ",
          "lname": "Benton",
          "age": 24,
          "mobile": "+1 (969) 457-3885",
          "cdate": "2016-08-22T05:18:06"
      },
      {
          "id": "59f9608fe198b49b045cf822",
          "fname": "Douglas ",
          "lname": "Richard",
          "age": 32,
          "mobile": "+1 (915) 481-3398",
          "cdate": "2016-03-14T07:33:03"
      },
      {
          "id": "59f9608f2f4597330db71a2f",
          "fname": "Nichols ",
          "lname": "Fisher",
          "age": 31,
          "mobile": "+1 (904) 575-2098",
          "cdate": "2016-06-30T11:30:18"
      },
      {
          "id": "59f9608fc974d50614dd54af",
          "fname": "Juliana ",
          "lname": "Hobbs",
          "age": 29,
          "mobile": "+1 (969) 413-3646",
          "cdate": "2015-11-20T05:32:49"
      },
      {
          "id": "59f9608fe0d183d2a4c2589c",
          "fname": "Hudson ",
          "lname": "Craft",
          "age": 28,
          "mobile": "+1 (939) 505-2688",
          "cdate": "2014-10-22T10:48:21"
      },
      {
          "id": "59f9608f62a66fc6620d7b0b",
          "fname": "Fay ",
          "lname": "Mayer",
          "age": 21,
          "mobile": "+1 (800) 510-3826",
          "cdate": "2017-05-25T08:37:54"
      },
      {
          "id": "59f9608fa4caf3c589926fd6",
          "fname": "Hampton ",
          "lname": "Marshall",
          "age": 37,
          "mobile": "+1 (970) 430-2699",
          "cdate": "2016-09-11T04:05:39"
      },
      {
          "id": "59f9608f626d2a773454c096",
          "fname": "Sanders ",
          "lname": "Hendrix",
          "age": 31,
          "mobile": "+1 (889) 463-3917",
          "cdate": "2016-11-07T06:42:59"
      },
      {
          "id": "59f9608f50c9f70f7dff16fa",
          "fname": "Goodman ",
          "lname": "Nash",
          "age": 20,
          "mobile": "+1 (828) 457-2110",
          "cdate": "2015-05-23T08:44:27"
      },
      {
          "id": "59f9608f844c9d8343012e3a",
          "fname": "Georgette ",
          "lname": "Lambert",
          "age": 37,
          "mobile": "+1 (959) 420-3994",
          "cdate": "2014-04-23T06:59:22"
      },
      {
          "id": "59f9608fedd38eaa308e593f",
          "fname": "Doyle ",
          "lname": "Mcneil",
          "age": 36,
          "mobile": "+1 (833) 505-2418",
          "cdate": "2016-05-28T04:15:12"
      },
      {
          "id": "59f9608f6b40b51c7f6fa2de",
          "fname": "Janette ",
          "lname": "Good",
          "age": 31,
          "mobile": "+1 (949) 415-3960",
          "cdate": "2015-10-14T08:06:10"
      },
      {
          "id": "59f9608f5c79f3a737ccaaf9",
          "fname": "Little ",
          "lname": "Guerrero",
          "age": 20,
          "mobile": "+1 (895) 550-3701",
          "cdate": "2017-05-02T02:07:10"
      },
      {
          "id": "59f9608f3c7cab05587fa112",
          "fname": "Joann ",
          "lname": "Le",
          "age": 35,
          "mobile": "+1 (976) 509-2301",
          "cdate": "2015-10-16T12:40:09"
      },
      {
          "id": "59f9608ff628863d928e18f6",
          "fname": "Erin ",
          "lname": "Bolton",
          "age": 28,
          "mobile": "+1 (877) 421-3227",
          "cdate": "2015-07-10T12:44:15"
      },
      {
          "id": "59f9608f85cd0b0ca815ae2a",
          "fname": "Johns ",
          "lname": "Melendez",
          "age": 26,
          "mobile": "+1 (904) 558-2227",
          "cdate": "2014-08-02T04:14:20"
      },
      {
          "id": "59f9608f713b133c70b16d86",
          "fname": "Juliet ",
          "lname": "Torres",
          "age": 20,
          "mobile": "+1 (928) 561-2561",
          "cdate": "2015-12-24T11:55:28"
      }
  ]

  //#endregion

  ngOnInit() {

    this.option = {
      Columns: [{
        DisplayText: 'First Name',
        Key: 'fname',
        ColumnType: GGridColumnType.String
      }, {
        DisplayText: 'Last Name',
        Key: 'lname',
        ColumnType: GGridColumnType.String
      }, {
        DisplayText: 'Age',
        Key: 'age',
        ColumnType: GGridColumnType.Int
      }, {
        DisplayText: 'Mobile',
        Key: 'mobile',
        ColumnType: GGridColumnType.String,
        Format: {
          Pattern: '/(\d)(?=(\d{3})+\.)/g',
          Delimiter: '$1,'
        }
      }, {
        DisplayText: 'Created Date',
        Key: 'cdate',
        ColumnType: GGridColumnType.DateTime,
        Format: {
          Pattern: 'DD/MM/YYYY'
        }
      }
      ],
      DataSourceType: GGridDataSourceType.Array,
      DataSource: this.dataSource,
      PaggedGrid: true
      //PageOption: {
      //  PageRowCount: 5
      //}
    }


    this.obs = Observable.of(this.arr);
   // this.obs2 = this.obs.distinct(res => res.name);

    //this.obs.subscribe(res => console.log(res))
  }

  RowSelect(rowSelectDataModal) {
    console.log(rowSelectDataModal);
  }
}
