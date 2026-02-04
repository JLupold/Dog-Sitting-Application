"use strict";

function Home() {
  return (
    <div className="home">
      <h2>Welcome to our Dog Sitting site!</h2>

      <p className="intro">
        Our service serves as a home away from home for your furry best friend 
        during any vacations, business trips, or any last-minute emergency leaves 
        from home you make to ensure your dog is both happy and cared for.
      </p>

      <div className="center">
        <img src="pics/doggies.jpg" alt="Dog" className="contentPic" />
      </div>

    </div>
  );
}