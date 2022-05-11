#!/bin/bash
while getopts c: flag; do
    case "${flag}" in
    c)
        case "${OPTARG}" in
        build)
            docker build . -t kite-wasm
            ;;

        run)
            docker run --rm -v $(pwd):/etc/kite-wasm kite-wasm 
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