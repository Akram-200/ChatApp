# Examen TT4 - Chat App React / Socket.io

## Q1 - Rôle des fichiers

### App.js
`App.js` est le composant racine de l’application côté client.  
Il gère les états globaux principaux : `username`, `room` et `connected`.  
Son rôle est de décider quel écran afficher :
- `Join.js` si l’utilisateur n’est pas encore connecté à une room,
- `Chat.js` si l’utilisateur a rejoint une room.

### Chat.js
`Chat.js` est le composant principal de la discussion.  
Il gère :
- la liste des messages,
- le champ de saisie,
- la liste des utilisateurs connectés dans la room,
- l’affichage de la sidebar,
- l’écoute des événements Socket.io liés aux messages et aux participants.

Il envoie aussi les messages au serveur avec `socket.emit("send_message", ...)`.

### Message.js
`Message.js` affiche un message individuel dans l’interface.  
Il distingue :
- les messages système,
- les messages de l’utilisateur courant,
- les messages des autres utilisateurs.

Il applique des classes CSS différentes selon le type de message.

### Sidebar.js
`Sidebar.js` affiche le panneau latéral du chat.  
Dans le code de base, il montre surtout :
- le nom de la room,
- la liste des participants connectés,
- leur avatar simplifié,
- un indicateur “en ligne”.

### Join.js
`Join.js` est l’écran d’entrée dans l’application.  
Il permet :
- de saisir un pseudo,
- de voir la liste des rooms disponibles,
- de créer une nouvelle room,
- de rejoindre une room existante.

Il écoute aussi la liste des rooms envoyée par le serveur en temps réel.

### server.js
`server.js` est le serveur Node.js / Express / Socket.io.  
Il gère :
- la création du serveur HTTP,
- la configuration Socket.io,
- la gestion des rooms,
- la liste des utilisateurs connectés,
- les événements `join_room`, `create_room`, `send_message` et `disconnect`.

Il rediffuse les messages et met à jour les participants.

### SocketContext.js
`SocketContext.js` centralise la création du socket côté React.  
Le socket est créé une seule fois au niveau du module avec `io(...)`, puis partagé dans l’application grâce à un React Context et au hook `useSocket()`.

Cela évite d’importer directement le socket dans chaque composant et permet à tous les composants React d’utiliser la même connexion Socket.io.

---

## Q2 - Communication frontend / backend

### 1. Création et partage du socket
Le socket est créé dans `SocketContext.js` avec `io(DEFAULT_SOCKET_URL, { autoConnect: false })`.  
Ensuite, ce socket est fourni à toute l’application avec `SocketContext.Provider`.  
Les composants React récupèrent ce socket grâce au hook `useSocket()`.

Donc :
- création du socket dans `SocketContext.js`,
- partage avec le Context React,
- utilisation dans `Join.js` et `Chat.js`.

### 2. Évènement émis quand un utilisateur rejoint une room
Quand un utilisateur rejoint une room, le frontend émet l’évènement :

```js
socket.emit("join_room", { username, room });


npm install