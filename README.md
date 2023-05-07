# TatoTunes

A blog type CRUD app that focuses on pairing good music & potatoes, built with **Node/Express.js** using EJS for server side rendering and **PostgreSQL** for the database.

[Try it here](https://tatotunes.onrender.com/) (deployed on Render's free tier so may take half a minute for the server to spin up)

<sub>**Guest credentials**: email: `guest@guestmail.com` && password: `pudding`

Screenshot:
![Screnshot](https://github.com/mountmike/TatoTunes/blob/main/public/images/screenshot.png?raw=true)



# **Planning process**

## Part 1

The plan is to build a newsfeed centric app that enables users to add, consume and interact with posts concerning music that is good to eat potatoes to. 

To view the exclusive content users will need to create a user account.

The biggest challenge going into this project seems to be how to structure the database as it is my first time interacting between multiple tables of data in an SQL db. I drew up some tables with a plan and decided to move forward - for better or worse!

![Wireframe1](https://github.com/mountmike/TatoTunes/blob/main/public/images/dbmap.png?raw=true)

### UX/UI Theme ideas
- POTATO CITY!
- ~~Mr potato head?~~
- ~~Soft vector potato animations?~~
- ~~Simplification aesthetic?~~
- ~~Farmville?~~


Quick Wireframe for Home page:

![Wireframe1](https://github.com/mountmike/TatoTunes/blob/main/public/images/wireframe1.png?raw=true)



##  Part 2

After the first day of coding I had a rough minimum viable product but was running into callback hell when it came to running multiple queries to the db on a single server route. It was clear that I needed a better approach so I began exploring asyncronous functions and promises. After some reading I found an alternative to "Node PG" for accessing my database called "PG-PROMISE" which had clear documentation I could follow. I re-wrote most of my code using `async/await` with this module. Innitially this seemed to fix the previous day's bugs like a charm but as I progressed I began noticing strange new bugs. An entire afternoon of debugging lead to me realiseing I could write similar asyncronous functions with the original "NODE PG" module and thus my evening was spent re-re-writing the db query/model functions at which point I had some wonderful sucess and all the database queries began consistently deliverying the expected results.

**Issues with the user session**

After setting up `express-session` for session management, it also became clear that having to log into my app every single time I made a change to the code was not ideal. I found a NODE module "connect-page-simple" that allowed me to store the session object in my db. It was relatively simple to setup and made a huge difference to the development process.


## Part 3 - additional features/refinements 
**Like/Comment buttons and functions**
- The challenge I faced was only enabling a like if the user hadn't yet liked a post - an exercise that seemed very simply on paper but threw my head for a newbie spin on execution.

**Add ability to create a new post**
- Easy enough but I want the UI to be a lot more cleaner and modern than previous attempts

**Add individual profile pages that can be dynamically linked to from all over the app**

**Refine db querry calls when it comes to multiple tables**
- As more data was acrued I began noticing strange bugs that didnt appear when I only had a few rows in each table. To fix I need to refactor some db calls and uitilise better **joining** of table data.


# Future thoughts
- Profile images
- ~~Randomized pairing of potatoes and tunes~~
    - Now a beta feature | an engine that will automatially find you a tune to listen based on the potato you select.
- Mobile friendly!

