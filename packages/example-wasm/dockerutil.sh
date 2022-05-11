#!/bin/bash
while getopts c: flag; do
    case "${flag}" in
    c)
        case "${OPTARG}" in
        build)
            docker build . -t example-wasm
            ;;

        run)
            docker run --rm -v $(pwd):/etc/example-wasm example-wasm 
            ;;

        *)
            echo "dockerutil.sh -c run|build"
            exit 
            ;;
        esac

        ;;
    *) 
        echo "dockerutil.sh -c run|build"
        exit 
        ;;
    esac
done