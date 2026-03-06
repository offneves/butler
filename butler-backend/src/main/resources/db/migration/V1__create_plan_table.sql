CREATE TABLE tab_plan (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    max_agents INTEGER NOT NULL,
    max_tools_per_agent INTEGER NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP
);

INSERT INTO tab_plan (
    name,
    description,
    max_agents,
    max_tools_per_agent,
    active,
    created_at,
    updated_at,
    expired_at
) VALUES
(
  'FREE',
  'Plano de cobertura básica grátis.',
  1,
  2,
  true,
  NOW(),
  null,
  null
),
(
  'PREMIUM',
  'Plano de cobertura média, com mais possibilidade de configurações.',
  2,
  3,
  true,
  NOW(),
  null,
  null
),
(
  'ULTIMATE',
  'Plano de cobertura avançada, com configurações de maior extensão.',
  5,
  10,
  true,
  NOW(),
  null,
  null
);
