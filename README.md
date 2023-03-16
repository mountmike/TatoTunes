# TatoTunes | A blog type crud app that focuses on pairing music & potatoes

Project 2 for GA SEI - Express.js CRUD app using Postgres deployed on Render.

Try it [here] (https://mountmike.github.io/Tic-Tac-Toe/)


Screenshot:




# **Planning process** | Phase 1

The plan is to build a newsfeed centric app that enables users to consume and interact with blog posts concerning music that is good to eat potatoes to. 

The feed can be viewed by the public but to interact with posts (comment/like) and add new posts you will need an account.

The biggest challenge going into this project seems to be how to structure the database. I drew up some tables with a plan and decided to move forward - for better or worse!

![Wireframe1](https://github.com/mountmike/TatoTunes/blob/main/public/images/dbmap.png?raw=true)

Theme
- POTATO CITY
    - Mr potato head?
    - soft vector potato animations?
    - Simplification aesthetic?


Wireframe for Home page:
![Wireframe1](https://github.com/mountmike/TatoTunes/blob/main/public/images/wireframe1.png?raw=true)



# Phase 2

After first day of coding I had a rough MVP but was running into callback hell when it came to running multiple queries to the db on one route. It was clear that I needed a better approach so I began exploring asyncronous functions and promises. After some reading I found an alternative to "Node PG" for accessing my database called "PG-PROMISE" which had clear documentation I could follow. I re-wrote most of my code using ``try``, ``catch`` & ``await `` with this module. Innitially this seemed to fix the previous day's bugs like a charm but as I progressed I began noticing strange bugs. An entire afternoon of debugging lead to me realise I could write similar asyncronous functions with the original "NODE PG" and thus my evening was spent re-re-writing the route functions at which point I had some wonderful sucess and all the database queries began consistently deliverying the expected results.

**Issues with the user session**
- It also became clear that logging into the app on my local server every single time I made a change to the code was not functional. After some research I found a NODE module "connect-page-simple" that allowed me to store the session object in my db. It was relatively simple to setup and made a huge different to development.





# Phase 3
**Like/Comment buttons and functions**
- Manage different users liking and commenting - the challenge I faced was only enabling a like if the user 

**Adding old *file* menu bar on the window which would unlock extra settings such as:**
- Custom player names
- New game to reset the board and scores.

# Future thoughts
- As an extra aesthetic feature I would love to have the screen mimic the Windows desktop environment and be able to launch the .exe, minimize, maximise and close it.
- Add to file menu something like:
    - Different game modes (such as speed round where you have 3 seonds to win)
    - Different board sizes


