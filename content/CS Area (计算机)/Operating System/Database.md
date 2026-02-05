---
title: Database
tags:
  - CS
draft: "false"
---
# Theory



# Application


# Case Study
![[postgre_admin_screenshot.png]]

**Explaining database terms**
Think of a PostgreSQL **cluster** as a _library building_, each **database** as a _book‑collection_, and a **schema** as a _bookshelf_ that keeps objects from colliding.  
Inside the bookshelf you file many kinds of “objects” (tables, functions, …).  
I’ll use a tiny _quality‑checks_ app as a running example.

| pgAdmin tree node               | What it is                                                   | 1‑line example from a **checks** app                                        |
| ------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- |
| **Casts**                       | Rules that let PostgreSQL convert one data type to another   | Built‑in cast lets you do `'42'::int` → converts text “42” to integer 42    |
| **Catalogs**                    | System tables that store PostgreSQL’s own metadata           | `pg_tables`, `pg_proc`, etc. (you rarely touch these directly)              |
| **Event Triggers**              | Triggers that fire on DDL (CREATE / ALTER / DROP) events     | Audit table changes: an event trigger logs whenever someone `DROP`s a table |
| **Extensions**                  | Plug‑ins packaged as a single command (`CREATE EXTENSION`)   | `CREATE EXTENSION pg_trgm;` to enable fuzzy‑string matching for check names |
| **Foreign Data Wrappers (FDW)** | Drivers that let you query _external_ data sources as tables | `postgres_fdw` → a foreign table that reads checks from another PG server   |
| **Languages**                   | Procedural languages in which you can write functions        | `plpgsql` is default; you can add `plpython3u` to script checks in Python   |
| **Publications**                | Named sets of tables for logical replication                 | Publish the `checks` table so a read‑only dashboard DB can subscribe        |
| **Schemas**                     | Namespaces inside a database; _public_ is the default        | You might add `maintenance` schema for housekeeping jobs                    |

---

### Inside a **schema** (e.g. `public`)

| Node                                                        | What it is                                                         | Example in a quality‑checks app                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| **Aggregates**                                              | Functions that roll up many rows into one value                    | Built‑in `AVG(duration)`; you could create `bool_and(pass)` to see if **all** builds passed               |
| **Collations**                                              | Rules for sorting & comparing text in a locale                     | French collation so “É” = “E” when ordering check descriptions                                            |
| **Domains**                                                 | A base type **plus a constraint**                                  | `CREATE DOMAIN percent AS numeric CHECK (VALUE BETWEEN 0 AND 100);`                                       |
| **FTS Configurations / Dictionaries / Parsers / Templates** | Building blocks of PostgreSQL full‑text search                     | Use `simple` configuration to index the _description_ column of each check                                |
| **Foreign Tables**                                          | Table objects whose data live in another source via FDW            | `jira_issues` table that actually pulls from JIRA’s DB                                                    |
| **Functions**                                               | Reusable routines that _return_ something                          | `recalc_status(check_id int) RETURNS boolean` recomputes PASS/FAIL                                        |
| **Materialized Views**                                      | Query result **stored on disk**; refreshed on demand               | `CREATE MATERIALIZED VIEW failing_checks AS SELECT * FROM checks WHERE status = false;`                   |
| **Operators**                                               | Symbols or keywords that call underlying functions                 | You could define `#` as an operator to compare two JSONB payloads                                         |
| **Procedures**                                              | Like functions but invoked with `CALL` and can manage transactions | `CALL backfill_metrics()` to batch‑update many check rows in one go                                       |
| **Sequences**                                               | Monotonic counters, often backing `SERIAL` / `IDENTITY` columns    | `checks_id_seq` generates the primary‑key values for `checks.id`                                          |
| **Tables**                                                  | Primary containers of data                                         | `checks(id, name, status, run_time, note)`                                                                |
| **Trigger Functions**                                       | Functions executed by a table trigger                              | `set_updated_at()` fires on `UPDATE` to stamp `updated_at` column                                         |
| **Types**                                                   | Custom composite or enum types                                     | `CREATE TYPE status_enum AS ENUM ('PASS', 'FAIL', 'SKIPPED');`                                            |
| **Views**                                                   | Saved `SELECT` queries that run on access (virtual tables)         | `CREATE VIEW pass_rate AS SELECT date_trunc('day', run_time) d, avg(status::int) FROM checks GROUP BY d;` |

---

### Putting it together – a micro workflow

1. **Table & sequence**
    ```sql
    CREATE TABLE checks (
      id        bigserial PRIMARY KEY,
      name      text,
      status    boolean,
      run_time  timestamptz,
      note      text
    );
    -- bigserial implicitly creates checks_id_seq
    ```
    
2. **Domain + enum type** (extra safety)
    ```sql
    CREATE TYPE status_enum AS ENUM ('PASS', 'FAIL', 'SKIPPED');
    ALTER TABLE checks ALTER status SET DATA TYPE status_enum USING
      (CASE WHEN status THEN 'PASS' ELSE 'FAIL' END)::status_enum;
    ```
    
3. **Trigger function** to auto‑timestamp
    ```sql
    CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS trigger LANGUAGE plpgsql AS $$
    BEGIN
      NEW.run_time := NOW();
      RETURN NEW;
    END$$;
    CREATE TRIGGER tg_run_time BEFORE INSERT ON checks
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    ```
    
4. **Materialized view** for dashboards
    ```sql
    CREATE MATERIALIZED VIEW failing_checks
    AS SELECT id, name, note FROM checks WHERE status = 'FAIL';
    ```
    
5. **Export to another server** with FDW + publication
    - `CREATE EXTENSION postgres_fdw;`
    - `CREATE SERVER qa_srv …;` _(FDW)_
    - `CREATE PUBLICATION checks_pub FOR TABLE checks;`
Now the pgAdmin tree will show a sequence, a trigger function, the materialized view, your enum **type**, and more—matching the nodes you wondered about.

---

### Cheat‑sheet memory hook

> **“Tables are the _nouns_, functions/procedures the _verbs_, views the _reports_, and everything else (casts, domains, triggers, etc.) are the _grammar_ that makes your database speak fluently.”**

When you browse pgAdmin, you’re just seeing all those nouns, verbs, and bits of grammar neatly organised.
