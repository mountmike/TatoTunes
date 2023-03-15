# TatoTunes | A blog type crud app that focuses on pairing music & potatoes

Project 2 for GA SEI - Express.js CRUD app using Postgres deployed on Render.

Try it [here] (https://mountmike.github.io/Tic-Tac-Toe/)


Screenshot:




# **Planning process** | Phase 1

The plan is to build a newsfeed centric app that enables users to consume and interact with blog posts concerning music that is good to eat potatoes to. 

The feed can be viewed by the public but to interact with posts (comment/like) you will need an account. There will also be an option to ask TatoTunes questions which will get published as a post.

I have initially outlined a minimum of 3 database tables required for storing data (users, posts, comments/likes). I will make an owner/contributer user type for myself or future business partners that will give access to creating a new post but most all users will be only have the ability to comment and submit questions to the blog.

Theme
- POTATO CITY
    - Mr potato head?
    - soft vector potato animations?
    - Simplification aesthetic?


Wireframe for Home page:
![Wireframe1](https://github.com/mountmike/TatoTunes/blob/main/public/images/wireframe1.png?raw=true)

# Phase 2

After first day of coding I had a rough MVP but was running into callback hell when it came to running multiple queries to the db on one route. It was clear that I needed a better approach so I added 'pg-promise' to my modules and began researching how to use it.




**Some kind of winning/drawing sequence with the DOM**
- a popup DIV that becomes visible at the conclusion of each round

**Keeping track of multiple round scores**
- Minesweeper inspired GUI for displaying the score count for each player
- DOM interactions that make it really clear who's turn it currently is

**Adding sound FX**

# Phase 3
**Saving score between refreshes**
- researched localStorage and added function to save scores, but now needs reset score capability

**Adding old *file* menu bar on the window which would unlock extra settings such as:**
- Custom player names
- New game to reset the board and scores.

# Future thoughts
- As an extra aesthetic feature I would love to have the screen mimic the Windows desktop environment and be able to launch the .exe, minimize, maximise and close it.
- Add to file menu something like:
    - Different game modes (such as speed round where you have 3 seonds to win)
    - Different board sizes


