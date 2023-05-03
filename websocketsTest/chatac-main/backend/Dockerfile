FROM python:3

ENV SERVER_PORT 8081
ENV SERVER_HOOKS chatac.hooks.DefaultChatHooks
ENV SERVER_HOOKS_PARAMS ""
ENV SERVER_LOG_LEVEL info

WORKDIR /usr/src/app
EXPOSE ${SERVER_PORT}

COPY setup.py .
COPY src/ src/
RUN pip install --no-cache-dir .

CMD chatac-server "--interface=0.0.0.0" "--port=${SERVER_PORT}" "--hooks=${SERVER_HOOKS}" "--hooks-params=${SERVER_HOOKS_PARAMS}" "--log-level=${SERVER_LOG_LEVEL}"
