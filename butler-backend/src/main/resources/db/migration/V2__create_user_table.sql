CREATE TABLE tab_user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    plan BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_login_at TIMESTAMP,
    last_password_reset_at TIMESTAMP,

    CONSTRAINT fk_tab_user_plan
        FOREIGN KEY (plan)
        REFERENCES tab_plan (id)
);
