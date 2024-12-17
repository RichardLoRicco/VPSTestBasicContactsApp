DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL
);

INSERT INTO contacts (name) VALUES ('John Doe');
INSERT INTO contacts (name) VALUES ('Jane Doe');
INSERT INTO contacts (name) VALUES ('Jim Beam');
