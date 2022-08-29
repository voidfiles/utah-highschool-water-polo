#! /usr/env/bin bash

export BASE_URL="https://docs.google.com/spreadsheets/d/11wN8PpBs94r5Y34XUiCD5sugKB5Y6ZTBOx2iTF4059c/export?format=csv"

curl -L "${BASE_URL}&gid=494485403" > ./scratch/494485403.csv    # Entries Divisions
curl -L "${BASE_URL}&gid=933617404" > ./scratch/933617404.csv    # Stucture
curl -L "${BASE_URL}&gid=164928778" > ./scratch/164928778.csv    # Rules
curl -L "${BASE_URL}&gid=1050661320" > ./scratch/1050661320.csv  # Standings
curl -L "${BASE_URL}&gid=160172473" > ./scratch/160172473.csv    # Site Address 
curl -L "${BASE_URL}&gid=1535323947" > ./scratch/1535323947.csv  # Master Schedule
curl -L "${BASE_URL}&gid=1632026842" > ./scratch/1632026842.csv  # By team - 6a girls
curl -L "${BASE_URL}&gid=492371606" > ./scratch/492371606.csv    # By team - 6a boys
curl -L "${BASE_URL}&gid=995471814" > ./scratch/995471814.csv    # By team - 5a girls
curl -L "${BASE_URL}&gid=1862252921" > ./scratch/1862252921.csv  # By team - 5a boys
curl -L "${BASE_URL}&gid=662412489" > ./scratch/662412489.csv    # By team - 4a girls
curl -L "${BASE_URL}&gid=1616992352" > ./scratch/1616992352.csv  # By team - 4a boys
curl -L "${BASE_URL}&gid=59583710" > ./scratch/59583710.csv      # by team - combo girls
curl -L "${BASE_URL}&gid=738172125" > ./scratch/738172125.csv    # By team - combo boys
