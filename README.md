# TatoTunes | A blog type crud app that focuses on pairing music & potatoes

Project 2 for GA SEI - Express.js CRUD app using Postgres deployed on Render.

Try it here (https://tatotunes.onrender.com/)

Screenshot:
![Screnshot](https://github.com/mountmike/TatoTunes/blob/main/public/images/screenshot.png?raw=true)




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
- The challenge I faced was only enabling a like if the user hadn't yet liked a post - an exercise that seemed very simply on paper but threw my head for a newbie spin on execution.

**Add ability to create a new post**
- Easy enough but I want the UI to be a lot more cleaner and modern thatn previous attempts

**Add individual profile pages that can be dynamically linked to from all over the app**


# Future thoughts
- Profile images
- Randomized pairing of potatoes and tunes


