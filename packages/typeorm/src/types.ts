export interface TypeormConfig {
    type?: "mysql"| "postgres"| "cockroachdb"| "mariadb"| "sqlite"| "better-sqlite3"| "capacitor"| "cordova"| "nativescript"| "oracle"| "mssql"| "mongodb"| "sqljs"| "react-native",
    host?: string,
    port?: number,
    username?: string,
    password?: string,
    database?: string,
    synchronize?: boolean,
    entities?: any[]
}