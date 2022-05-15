import React from "react";

function DirectorView(props) {
  return(
    <div>
      <h1>{props.director._id}</h1>
      <p>{props.director.Bio}</p>
    </div>
  )
}

export default DirectorView;

