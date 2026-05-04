set dotenv-load
set ignore-comments

# just() {
#   if [[ "$1" == "fmt.check" ]]; then
#     command just fmtcheck
#   else
#     command just "$@"
#   fi
# }

up:
    #!/usr/bin/env bash

    cleanup() {
        echo "Exiting... running cleanup (just down)"

        just down
    }

    trap cleanup SIGINT

    docker compose up web --watch &

    DOCKER_PID=$!
    wait $DOCKER_PID

down:
    docker compose down --rmi local --volumes

# @ensure-synced:
#     #!/usr/bin/env bash
#     if [ ! "$(docker ps -q -f name=dev)" ]; then \
#         echo "Starting sync engine..."; \
#         docker compose up dev -d --watch; \
#         sleep 2; \
#     fi

dev:
    docker compose up dev -d
    docker compose exec dev pnpm run dev --host

build:
    docker compose up dev -d
    docker compose exec dev pnpm run build

fmt-check:
    docker compose up dev -d
    docker compose exec dev pnpm run fmt.check

lint:
    # docker compose watch dev --no-up &
    docker compose up dev -d
    docker compose exec dev pnpm run lint

knip:
    docker compose up dev -d
    docker compose exec dev pnpm exec knip

preview:
    docker compose up dev -d
    docker compose exec dev pnpm run preview --host

storybook:
    docker compose up dev -d
    docker compose exec dev pnpm run storybook

build-storybook:
    docker compose up dev -d
    docker compose exec dev pnpm run build-storybook

test:
    docker compose up dev -d
    docker compose exec dev pnpm run test --project unit

[env("PW_TEST_CONNECT_WS_ENDPOINT", "ws://playwright:9000/")]
smoke-test:
    docker compose up dev playwright -d
    docker compose exec dev pnpm run test --project storybook

[env("PW_TEST_CONNECT_WS_ENDPOINT", "ws://playwright:9000/")]
e2e:
    docker compose up dev playwright -d
    docker compose exec dev pnpm exec playwright test

# healthcheck:
#     docker compose up dev -d
#     docker compose exec dev docker inspect --format='{{.State.Health.Status}}' imh
