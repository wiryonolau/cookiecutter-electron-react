FROM electronuserland/builder:wine

RUN adduser --disabled-password --gecos '' user \
    && echo "root ALL = NOPASSWD; /bin/su" >> /etc/sudoers

COPY ./docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
