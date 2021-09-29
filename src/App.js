import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import OrderContainer from "./components/OrderContainer";
import TransportCompanyContainer from "./components/TransportCompanyContainer";
import TripContainer from "./components/TripContainer";
import VehicleContainer from "./components/VehicleContainer";
import Home from "./components/Home"

function App() {
  return (
    <>
      React App
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path ="/orders">
          <OrderContainer/>
        </Route>
        <Route path="/transport_companies">
          <TransportCompanyContainer/>
        </Route>
        <Route path="/vehicles">
          <VehicleContainer/>
        </Route>
        <Route path="/trips">
          <TripContainer/>
        </Route>
        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
      
    </>
  );
}

export default App;
