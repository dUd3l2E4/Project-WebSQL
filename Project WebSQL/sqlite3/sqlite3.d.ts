declare namespace sqlite3 {
    interface Connection {
        cursor(): sqlite3.Cursor;
        commit(): Promise<Blob>;
    }
    interface Cursor {
        execute(sql: string, args?: string[]): Promise<SQLResultSetRowList>;
    }
    function connect(path: string, size?: number): Promise<sqlite3.Connection>;
}
interface SQLResultSetRowList {
    readonly [index: number]: {
        readonly [column: string]: string | number;
    };
    readonly length: number;
}
interface SQLResultSet {
    readonly insertId: number;
    readonly rows: SQLResultSetRowList;
    readonly rowsAffected: number;
}
