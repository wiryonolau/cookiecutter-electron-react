#!/bin/bash

USERID=${USERID:-1000}
GROUPID=${GROUPID:-1000}

usermod -u ${USERID} user
groupmod -g ${USERID} user

su - user --command /bin/bash -c "${@}"
