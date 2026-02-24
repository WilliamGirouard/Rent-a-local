# Rent-a-local

Web application that lets you rent premises for your private meetings.

## Commands for backend

    1- cd apps/backend/
    2- npx @nestjs/cli g module users
    3- npx @nestjs/cli g module reports
    4- npx @nestjs/cli g service users
    5- npm install -g npm@11.10.0
    6- npx @nestjs/cli g controller users
    7- npm i @nestjs/typeorm typeorm sqlite3
    8- npm i class-validator class-transformer
    9- Installer : SQLite | Sur VSCode (extension)
    10- Installer packages bcrypt pour hasher les User passwords :

        A- npm i bcrypt
        B- npm i -D @types/bcrypt

    11- npx @nestjs/cli g module hashing
    12- npx @nestjs/cli g service hashing

### Ajout hashing et serialization

    L'installation et l'utilisation du package bcrypt est primordial pour securiser les données des utilisateurs. 
    Il permet d'encoder ou de hasher des strings (hasher est 1000x plus sécurisé donc nous hashons). 
    Pour respecter les notions NestJS, au lieu de faire le hashing dans UsersService on crée un module et service à part, contenant deux fonctions asynchrones. 
    La première permet de hash un mot de passe, la deuxième permet de comparer un string avec un hash pour dire si c'est le bon password (utile pour plus tard, lorsque login réel.)
    Pour l'instant il y a une fausse route login qui test - ça marche. 
    Export HashingService dans HashingModule et import HashingModule dans UsersModule.

    ---
    
    La serialization est un processus qui se passe avant que les objets soient retournés dans la réponse. C'est donc le bon moment pour intercepter ces données et les transformer/nettoyer en ce qu'on veut (Ex: Pas montrer le password).

    Pour la serialization : 
    
        - On utilise @Exclude() et @Expose() de class-transformer dans l'entité.
        - On utilise @UseInterceptors(ClassSerializerInterceptor) de @nestjs/common dans le controller
        - On utilise @SerializeOptions({type: User}) de @nestjs/common dans le controller

    @Exclude() permet de ne pas afficher la propriété et/ou classe lorsqu'on affiche un User par exemple (Comme le password...)

    @Expose() permet de créer une propriété en contenant d'autres (analogue au getter) ou de créer un alias au nom d'une propriété. (Ex: fullname qui contient firstName et lastName). De ce fait, on peut exclure fullName et
    lastName pour afficher à l'utilisateur directement son nom complet. 
    (firstName et lastName restent obligatoire lors de la création d'un compte)

    @UseInterceptors(ClassSerializerInterceptor) permet l'utilisation des Intercepteurs (Soient Exclude et Expose dans notre cas). En gros, il utilise sa méthode instanceToPlain() pour ensuite pouvoir utilisé qu'importe décorateurs de class-transformer et transformer la réponse.

    @SerializeOptions({type: User}) permet de s'assurer que l'objet renvoyé est tel qu'on le veut. Plusieurs options disponibles, dans le cas de type: User, transforme l'objet renvoyé en objet User.


