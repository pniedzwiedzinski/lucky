FROM ubuntu:18.04

RUN apt-get update

RUN apt-get update && apt-get install -y \
    chromium-browser \
    chromium-chromedriver \
    python3 \
    python3-pip \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home

COPY requirements.txt .

RUN python3 -m pip install -r requirements.txt

RUN apt-get purge \
    python3-pip

ADD . /home

ENTRYPOINT [ "./docker_entrypoint.sh" ]
