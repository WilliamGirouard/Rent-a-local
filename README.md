# Rent-a-local
Web application that lets you rent premises for your private meetings.


## Commands for backend (February 17th)
    
    1- cd apps/backend/
    2- npx @nestjs/cli g module users
    3- npx @nestjs/cli g module reports
    4- npx @nestjs/cli g service users
    5- npm install -g npm@11.10.0
    6- npx @nestjs/cli g controller users
    7- npm i @nestjs/typeorm typeorm sqlite3
    8- Installer : SQLite | Sur VSCode (extension)

### Etapes TODO Backend
    
    1- Creer Entite
    2- Dans users.service : appeller direct la BD grace au InjectRepository de nestjs/typeorm
            `@InjectRepository(User)
             private usersRepository : Repository<User>,`