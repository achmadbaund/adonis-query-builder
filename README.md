Query builder

The Database query builder is used to construct `SELECT, UPDATE, and DELETE` SQL queries. For inserting new rows you must use the `insert query builder` and use `raw query builder` for running raw SQL queries.

You can get an instance of the database query builder using one of the following methods.

```php
import Database from '@ioc:Adonis/Lucid/Database'

Database.query()

// selecting table returns the query builder instance as well
Database.from('users')

```
Methods/properties

Following is the list of available methods/properties available on the Query builder instance.
select

The select method allows selecting columns from the database table. You can either pass an array of columns or pass them as multiple arguments.

```php
Database
  .from('users')
  .select('id', 'username', 'email')
```

Column aliases

You can define aliases for the columns using the as expression or passing an object of key-value pair.

```php
Database
  .from('users')
  .select('id', 'email as userEmail')
```
```php
Database
  .from('users')
  .select({
    id: 'id',

    // Key is alias name
    userEmail: 'email'
  })
 ```
