# Usage:
# ./copy-desk.sh <ship_name> <desk>
# ./copy-desk.sh zod sandbox-test-app

mkdir -p "ships/$1/$2" && cp -R -f desk/* ships/$1/$2 && echo "~$1" > ships/$1/$2/desk.ship
