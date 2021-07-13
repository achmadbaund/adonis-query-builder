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
where

The where method is used to define the where clause in your SQL queries. The query builder accepts a wide range of arguments types to let you leverage the complete power of SQL.

The following example accepts the column name as the first argument and its value as the second argument.

```php
Database
  .from('users')
  .where('username', 'virk')
```
You can also define SQL operators, as shown below.

```php
Database
  .from('users')
  .where('created_at', '>', '2020-09-09')
```

// Using luxon to make the date

```php
Database
  .from('users')
  .where('created_at', '>', DateTime.local().toSQLDate())
```

// Using like operator

```php
Database
  .from('posts')
  .where('title', 'like', '%Adonis 101%')
```

Where groups

You can create where groups by passing a callback to the where method. For example:

```php
Database
  .from('users')
  .where((query) => {
    query
      .where('username', 'virk')
      .whereNull('deleted_at')
  })
  .orWhere((query) => {
    query
      .where('email', 'virk@adonisjs.com')
      .whereNull('deleted_at')
  })
```

Generated SQL

```php
SELECT * FROM "users"
  WHERE (
    "username" = ? AND "deleted_at" IS NULL
  )
  or (
    "email" = ? AND "deleted_at" IS NULL
  )
```

Using raw queries

Similarly, you can also define a raw query.

```php
Database
  .from('user_groups')
  .where(
    'user_id',
    Database
      .raw(`select "user_id" from "users" where "users"."user_id" = ?`, [1])
      .wrap('(', ')')
  )
```
where method variants

Following is the list of the where method variations and shares the same API.
Method	Description

andWhere	Alias for the where method
orWhere	Adds an or where clause
whereNot	Adds a where not clause
orWhereNot	Adds an or where not clause
andWhereNot	Alias for whereNot
