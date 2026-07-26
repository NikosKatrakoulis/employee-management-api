CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department_id BIGINT NOT NULL REFERENCES departments(id),
    salary DECIMAL(19,2) NOT NULL
);