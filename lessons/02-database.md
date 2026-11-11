# Lesson 2 – MySQL & the table

**Goal:** connect Node to MySQL and have a `conversations` table.

## Concepts
- A connection **pool** reuses connections instead of opening one per request.
- `mysql2/promise` lets you use `async/await`.
- Always use **placeholders** (`?`) in queries – never string-concatenate user input (SQL injection).

## Tasks
1. MySQL is already running in Docker (`docker ps` shows `chatgpt-mysql`; root pw `changeme`). Open a shell: `docker exec -it chatgpt-mysql mysql -uroot -p`.
2. Design the table yourself: `id` (auto-increment PK), `role` (user/assistant), `content` (long text), `created_at`. Write `schema.sql`, then run it. (A table from my reference may already exist – `DROP DATABASE chatgpt_clone;` first so you build it yourself.)
3. `npm i mysql2`. Add DB values to `.env`.
4. Create `config/db.js` that exports a pool.
5. Temporarily test: `const [rows] = await pool.query('SELECT 1')` and log it.

## Hints
- `ENUM('user','assistant')` restricts values. `TEXT` for long content.
- `mysql.createPool({ host, user, password, database })`.
- `pool.query` returns `[rows, fields]` – destructure the first.

## Checkpoint
Your test query prints a result; `DESCRIBE conversations;` shows your columns.

## Commands you'll run
```bash
# check MySQL is running
docker ps
# if it is not running:
docker start chatgpt-mysql
# (first time only, if the container doesn't exist)
docker run -d --name chatgpt-mysql -e MYSQL_ROOT_PASSWORD=changeme -p 127.0.0.1:3306:3306 mysql:8

# open the MySQL shell (password: changeme)
docker exec -it chatgpt-mysql mysql -uroot -p
```
Inside the MySQL shell:
```sql
DROP DATABASE IF EXISTS chatgpt_clone;   -- wipe my reference version
SHOW DATABASES;
```
Run your own schema file from the backend folder:
```bash
docker exec -i chatgpt-mysql mysql -uroot -pchangeme < schema.sql
docker exec chatgpt-mysql mysql -uroot -pchangeme -e "DESCRIBE chatgpt_clone.conversations"
npm install mysql2
npm run dev
```
