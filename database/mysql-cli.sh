#!/bin/bash

# MySQL CLI connection script

# Connection details
DB_HOST=db
DB_PORT=3306
DB_USER=Soundify
DB_PASS=Soundify
DB_NAME=Soundify

#!/bin/bash
# Connect to the MySQL database inside the container
docker exec -it docker-compose-projekt-db-1 mysql -uroot -proot Soundify
