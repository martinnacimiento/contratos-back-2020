set -e
cd /utils
psql -h localhost -U postgres -p 5432 < contratos.sql