#!/bin/bash

# Garante que estamos na pasta certa
cd /app

# Tenta criar a pasta se ela sumiu por algum motivo no volume
mkdir -p public

# Cria o arquivo
cat <<EOF > ./public/env-config.js
window.ENV = {
  CORE_API_URL: "${CORE_API_URL}",
  SESSION_COOKIE_NAME: "${SESSION_COOKIE_NAME}"
};
EOF

echo "Arquivo de ambiente gerado em /app/public/env-config.js"

# Executa o servidor
exec node server.js