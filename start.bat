cd "C:\Program Files\Docker\Docker"
"Docker Desktop.exe"

cd "C:\Users\yahya\Desktop\Air-Bnb-CLONE\BnB"

docker-compose up -d

start cmd /k "cd C:\Users\yahya\Desktop\Air-Bnb-CLONE\BnB && mvn spring-boot:run"
start cmd /k "cd C:\Users\yahya\Desktop\Air-Bnb-CLONE\frontend && npm run start"
