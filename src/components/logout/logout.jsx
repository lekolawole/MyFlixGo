import { Button } from "react-bootstrap";
import { MainView } from "../main-view/main-view";

function logoutButton() {
  return(
    <Button onClick={() => {this.onLoggedOut()}}>Logout</Button>
  )
}

export default logoutButton;