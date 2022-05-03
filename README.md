# Greelow - Boilerplate with 

🍬 Technologies: typeOrm, typeScript, nodejs, Expressjs, postgres

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://github.com/Greelow-LLC/boiler-express-type)


## Quick Start

Every API endpoint is consided of one `route` and one `action`.

1. Open the routes.ts file and add a new route to the list of entpoints, for example, if we want to build an endpoint to retrieve a single user information:

```js
import { Router } from 'express';
import { safe } from './utils';
import { getUser } from './actions';
const router = Router();


router.get('/user/:id', safe(getUser));
```

Note: please note that the `save` function must always be called before your action or the API errors will be silent

2. Open the `actions.ts` and add or re-use one of the action functions, for example:

```js
export const getUser = async (req: Request, res: Response): Promise<Response> =>{
	
	const users = await getRepository(Users).findOne(req.params.id);
	return res.json(users);
}
```


## Migrations (only for production environment)

1. Generate a new migration file after changes were made to the models:

```bash
$ typeorm migration:generate -n <pick_a_migration_name>
```

2. Run your all of your pending migrations:

```bash
$ typeorm migration:run
```



## PostgreSQL


This will give you an auto-starting PostgreSQL server (it should auto-start every time you open a new Terminal), plus a few utility scripts that you can run in a Terminal:

```
pg_start: start the PostgreSQL service
pg_stop: stop the PostgreSQL service
pg_ctl status: check if the PostgreSQL service is running
Once the PostgreSQL server is running, you can use the psql CLI as usual:

Type "help" for help.

1) Connect to PostgreSQL database
$ psql -d database -U  user -W
2) Switch connection to a new database
\c dbname username
3) List available databases
\l
4) List available tables
\dt
5) Describe a table
\d table_name

postgres=#
```

## MySQL


This will give you an auto-starting MySql server (it should auto-start every time you open a new Terminal), plus a few utility scripts that you can run in a Terminal:

```
1) Connect to MySQL database
mysql --host=localhost --user=myname --password=password mydb
2) Switch connection to a new database
use database_name;
3) List available databases
show databases;
4) List available tables
show tables;
5) Describe a table
describe table_name;

mysql=#
```

## Docker-compose


The configuration for the docker-compose is setted in the `docker-compose.yml` file:

```
version: "3.3"
services:
  postgres:
    image: postgres:14.2
    environment:
      - POSTGRES_USER=${POSTGRES_USER}  
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    ports:
      - 5432:5432
    volumes:
      - postgres_data:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=${PGADMIN_DEFAULT_EMAIL}
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_DEFAULT_PASSWORD}
    ports:
      - 5050:80
volumes: 
  postgres_data: 
    driver: local
```

You will find the environment variables in the `.env` file.

Run this command in order to initialize the docker-compose:

```bash
$ docker-compose up
```



