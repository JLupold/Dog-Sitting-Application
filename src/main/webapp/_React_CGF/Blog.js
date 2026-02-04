"use strict";

function Blog() {
  return (
    <div className="blog">
      <h2>Blog</h2>
      <p>
        Here we serve to ensure your dog needs are well met each and every day
        in our care. To help make sure that standard is reached we'll need
        you to fill out information regarding your dog's name, tag, breed, as
        well as any of its health/behavior concerns.
      </p>

      <h3>Server Page</h3>
      <p>
        For my Server Side page, click{" "}
        <a href="hello" target="_blank">here</a>.
      </p>

      <h3>API Testing</h3>
      <p>
        Test the Log On, Get Profile, and Log Off APIs by
        clicking <a href="apiTest.html" target="_blank">here</a>.
      </p>

      <h3>Web API</h3>
      <p>
        To see my <strong>List dog_info API</strong> open up in a new tab,
        click <a href="dog_info/getAll" target="_blank">here</a>.
      </p>

      <p>
        To see my <strong>List web_user API</strong> open up in a new tab,
        click <a href="webUser/getAll" target="_blank">here</a>.
      </p>

      Click <a target="_blank" href="docs/Web_API_Errors.pdf">here</a> to see my Web API errors document.

      <h3>Proposed Database Table</h3>
      <ul>
        <li>dog_id -- INT(11), AUTO_INCREMENT, PK</li>
        <li>dog_tag -- VARCHAR(10), UNIQUE, NOT NULL</li>
        <li>dog_name -- VARCHAR(15), NOT NULL</li>
        <li>dog_breed -- VARCHAR(15), NOT NULL</li>
        <li>medical_concerns -- VARCHAR(50), NULL</li>
        <li>behavioral_concerns -- VARCHAR(50), NULL</li>
        <li>dateof_dropoff -- DATE, NOT NULL</li>
        <li>dateof_pickup -- DATE, NOT NULL</li>
        <li>image_url -- VARCHAR(200), NULL</li>
        <li>web_user_id -- INT(11), NOT NULL, FK</li>
        <li>user_email -- VARCHAR(45), NOT NULL, FK</li>
      </ul>

      <h3>Database</h3>
      <p>
        I dont have much experience with databases prior to this class. So far
        my experience has just been this assignments and I find them pretty help.
        My overall experience with them has been smooth.
      </p>

      Click <a target="_blank" href="docs/lupold_database.pdf">here</a> to see my database document.

      <h3>My Database Experience</h3>
      <p>I don't any database experience prior to what we've learned in this class so far.</p>

      <h3>My Web Development Experience</h3>
      <p>
        Months ago I tried using HTML and CSS to create a proflio website to put on a
        resume to showcase off my coding projects but I eventually quit because I got
        completely stuck on a part of it. I have no other experience besides that.
      </p>

      <h3>HW 1 Home Page</h3>
      <p><strong>Found Easy:</strong> I found it easy to actually make edits to the website itself. More specifcally
        interms of adding text, changing styling, or changing dimensions.</p>
      <p><strong>Found Hard/Confusing:</strong> I found hard to follow the directions sometimes just because theres just some much
        instructions and I dont have much experience with web design.</p>
      <p><strong>Found Valuable:</strong> I found everything in this homework to be very valuable because I'm still in the
        early stages of learn web design and everything in here was useful information.</p>


      <h3>HW 2 Databases</h3>
      <p><strong>Found Easy:</strong> I found it easy adding the rows and columns to the database as well as adding
        in the information.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing to execute the select
        statements sometimes because I would make so error with the syntex.</p>
      <p><strong>Found Valuable:</strong> I found everything in this assignment valuable because I haven't had
        much work with databases in the past.</p>


      <h3>HW 3 Single Page</h3>
      <p><strong>Found Easy:</strong> I found it easy using adding the home and blog content to their respective pages.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing working with react and js sometimes as I haven't used
        either that much both and because of that I would get errors I sometimes didn't understand.</p>
      <p><strong>Found Valuable:</strong> I found everything involving the react and js code to pretty valuable because I don't
        have much experience with either.</p>

      <h3>HW 4 JS Components</h3>
      <p><strong>Found Easy:</strong> I found it easy incorporating the different javascript components to website.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing following the directions sometimes simply,
        because there is alot of them.</p>
      <p><strong>Found Valuable:</strong> I found everything involving the js code to pretty valuable because I don't
        have much experience js outside of what we've done in this class so far.</p>

      <h3>HW 5 Web API</h3>
      <p><strong>Found Easy:</strong> I found it easy creating/structuring my database.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing trying to generate the errors for the document
        requirements.</p>
      <p><strong>Found Valuable:</strong> I found practicing to generate the errors to be valuable because knowing how to
        deal with those errors may be useful in the future.</p>

      <h3>HW 6 ShowData</h3>
      <p><strong>Found Easy:</strong> I found it easy editing/adjusting both the web_user table and my other table.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing getting my other table's information to
        show up on website. Mostly because theres so many different spots where you have to link different things to
        eachother.</p>
      <p><strong>Found Valuable:</strong> I found working with the SQL statements and linking the SQL table info to
        my webpage to be pretty valuable as this will be useful knowledge to have in the future.</p>
      
        <h3>HW 7 LogOn</h3>
      <p><strong>Found Easy:</strong> I found it easy testing the different APIs.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing getting my log on and profile sections to display
        the database information for the specific users.</p>
      <p><strong>Found Valuable:</strong> I found working with log in and log off APIs to be valuable as its something I'll
        likely use in the future.</p>
      
        <h3>HW 8 Insert</h3>
      <p><strong>Found Easy:</strong> I found it easy to incorporating most of the needed sample code to my project.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing finding exactly where to place the buttons to route
        to the insert page.</p>
      <p><strong>Found Valuable:</strong> I found working with data insertion to pretty valuable considering thats a huge part
        of creating a webpage, having the user be able to insert all of their needed information.</p>
      
        <h3>HW 9 Update</h3>
      <p><strong>Found Easy:</strong> I found it easy adding the update buttons to each table.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing getting the text boxes to display the info of the data
        set I clicked on. Like if I clicked a specifc row to edit, it was difficult to get that row's information to display in the text
       boxes to edit.</p>
      <p><strong>Found Valuable:</strong> I found adding the edit feature to be valuable because its a useful aspect to know how to work
        with when dealing with webpages.</p>
      
        <h3>HW 10 Delete</h3>
      <p><strong>Found Easy:</strong> I found it easy adding the delete buttons to each table.</p>
      <p><strong>Found Hard/Confusing:</strong> I found it hard/confusing getting records to delete when I started this homework, I was
        originally getting 400 errors but it was just a minor issue.</p>
      <p><strong>Found Valuable:</strong> I found adding the delete feature to be valuable because its just another useful aspect to know how to
        work with when dealing with webpages.</p>
    </div>

  );
}