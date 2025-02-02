
# create the derived image from node version 22
FROM base-image AS derived-task-image

# set the working directory as app
WORKDIR /app

# copy derived image's package.json & env file and rename them
COPY derived-task-image/package.json /app/derived-task-image-package.json
COPY derived-task-image/.env /app/derived-task-image.env
COPY derived-task-image/ /app/

# Install jq for JSON processing
# RUN apt-get update && apt-get install -y jq
RUN apt-get update && apt-get install -y jq

# Merge base-image and derived image package.json files using jq (including all relevant sections like dependencies, scripts, etc.)
RUN jq -s '.[0] * .[1] | {dependencies: (.dependencies // {}), scripts: (.scripts // {}), devDependencies: (.devDependencies // {})}' /app/base-image-package.json /app/derived-task-image-package.json > /app/package.json

# Add "type": "module" to the merged package.json without overwriting the whole file
RUN jq '. + { "type": "module" }' /app/package.json > /app/merged-package.json && mv /app/merged-package.json /app/package.json

# Merge base.env and derived-task-image.env files into a single .env file
RUN cat /app/base-image.env /app/derived-task-image.env > /app/.env

RUN npm install

CMD ["node", "index.js"]
