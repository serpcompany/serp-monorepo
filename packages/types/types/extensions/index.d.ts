import '@nuxthub/core';

declare module '@nuxthub/core' {
  interface ModuleOptions {
    databaseMigrationsDirs?: string[];
  }
}
