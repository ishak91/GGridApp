
export enum GGridDataSourceType {
    Array,
    URL
}

export enum GGridColumnType {
    String,
    Int,
    Decimal,
    Boolean,
    DateTime,
    Hidden
}


export class GGridColumnOption {
    Key: string;

    DisplayText: string;
    ColumnType?: GGridColumnType;
    Format?: GGirdColumnFormatOption

}

export interface GGirdColumnFormatOption {
    Pattern: string
    Delimiter?: string
}

export interface GGridPageOption {
    PageRowCount: number;
}

export interface RowSelectEventModal {
    index: number;
    rowData: any;
}

export class GGridOption {

    Columns: Array<GGridColumnOption>;
    DataSourceType: GGridDataSourceType;
    DataSource?: Array<any>;
    PaggedGrid?: boolean;
    PageOption?: GGridPageOption

}
