-- create_database.sql
DROP DATABASE IF EXISTS contactbook;
CREATE DATABASE contactbook;


-- Create the database (this needs to be run while connected to a different database, typically 'postgres')
  -- psql -U postgres -f sql/create_database.sql

-- Now connect to the new database and create the tables
  -- psql -U postgres -d contactbook -f sql/init.sqlpm