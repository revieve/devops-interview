FROM node:lts

WORKDIR /usr/csv-parser

COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile

COPY src ./src
COPY tests ./tests
COPY .prettierrc babel.config.cjs eslint.config.js rollup.config.mjs tsconfig.json .
COPY data ./data

RUN yarn build

RUN <<EOF
   useradd -s /bin/bash -m runner
   chown -R runner:runner /usr/csv-parser
EOF

USER runner

# ENV PRODUCTS_CSV /usr/csv-parser/data/products.csv

ENTRYPOINT [ "yarn" ]
