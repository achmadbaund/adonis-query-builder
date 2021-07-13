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
Using sub queries

Also, you can make use of sub-queries and raw-queries for generating columns at runtime, for example, selecting the last login IP address for a user from the user_logins table.

```php
Database
  .from('users')
  .select(
    Database
      .from('user_logins')
      .select('ip_address')
      .whereColumn('users.id', 'user_logins.user_id')
      .orderBy('id', 'desc')
      .limit(1)
      .as('last_login_ip') // 👈 This is important
  )
```

 Using raw queries

Similar to a sub-query, you can pass an instance of the raw query as well.

```php
Database
  .from('users')
  .select(
    Database
      .raw(`
        (select ip_address from user_logins where users.id = user_logins.user_id limit 1) as last_login_ip
      `)
  )
```

from

The from method is used to define the database table for the query.

```php
Database.from('users')
```

The query builder also allows using derived tables by passing a sub-query or a closure (which acts like a sub-query).

```php
Database.from((subquery) => {
  subquery
    .from('user_exams')
    .sum('marks as total')
    .groupBy('user_id')
    .as('total_marks')
}).avg('total_marks.total')
```
