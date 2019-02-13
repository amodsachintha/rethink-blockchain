FROM ubuntu:xenial

# Install curl, wget, node and npm
RUN apt-get update && apt-get upgrade
RUN apt-get install -y curl wget
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y nodejs && node --version && npm --version

# Install RethinkDB Xenial repo and RethinkDB
RUN echo "deb http://download.rethinkdb.com/apt xenial main" | tee /etc/apt/sources.list.d/rethinkdb.list
RUN wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | apt-key add -
RUN apt-get update && apt-get install -y rethinkdb
RUN npm install -g nodemon concurrently

# ** NO MINIO SETUP YET! **

# BLOCKCHAIN
EXPOSE 3000
EXPOSE 6000

# RETHINK ADMIN
EXPOSE 8080
# RETHINK CLIENT
#EXPOSE 28015

# START RETHINKDB as daemon and run npm dev scripts
ENTRYPOINT rethinkdb -n vault --bind all --initial-password vault --daemon && cd /rethink-blockchain && npm start