Query builder

The Database query builder is used to construct `SELECT, UPDATE, and DELETE` SQL queries. For inserting new rows you must use the `insert query builder` and use `raw query builder` for running raw SQL queries.

You can get an instance of the database query builder using one of the following methods.

```php
import Database from '@ioc:Adonis/Lucid/Database'

const users = await Database
  .query()  // 👈 gives an instance of select query builder
  .from('users')
  .select('*')

```
