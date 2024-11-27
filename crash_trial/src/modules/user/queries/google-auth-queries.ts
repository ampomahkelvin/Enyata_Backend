const getUser = `
SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?
`

const createFederatedCred = `
INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)
`

export const federatedCredQueries = {
  getUser,
  createFederatedCred,
}
