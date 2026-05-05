up:
    #!/usr/bin/env bash

    cleanup() {
        echo "Exiting... running cleanup (just down)"

        just down
    }

    trap cleanup SIGINT

    docker compose up --watch &

    DOCKER_PID=$!
    wait $DOCKER_PID

down:
    docker compose down --rmi local --volumes
