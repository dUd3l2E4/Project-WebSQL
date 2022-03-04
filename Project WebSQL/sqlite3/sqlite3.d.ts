declare namespace sqlite3 {
    interface Connection {
        cursor(): Promise<sqlite3.Cursor>;
    }
    interface Cursor {
        execute(sql: string, args?: string[]): Promise<SQLResultSetRowList>;
    }
    function connect(path: string, size?: number): sqlite3.Connection;
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
interface SQLTransaction {
    executeSql(query: string, and: string[], cb: (tx: SQLTransaction, res: SQLResultSet) => void, er: (er: Error) => void);
}
interface Database {
    transaction(callback: (tx: SQLTransaction) => void): void;
}
declare function openDatabase(id: string): Database;
