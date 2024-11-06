import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";
import Faqs from "./pages/Faqs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SupportAdmin from "./support/SupportAdmin";
import SupportEngine from "./support/SupportEngine";
import Peer from "peerjs";
import CallModal from "./support/SupportEngine/SupportWindow/CallModal";
import DeleteAccount from "./pages/DeleteAccount";

function App() {
  const auth = false; // Replace with your actual authentication logic
  const [show, setShow] = useState(false);

  const { call, support } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io();
    // console.log(socket);
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
      secure: true,
    });
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);
  return (
    <Router>
      <div className="font-sans">
        <div className={auth === true ? "hidden" : "visible"}>
          <Header show={show} setShow={setShow} />
        </div>
        <div className={auth === true ? "visible" : "hidden"}>
          <Navbar />
        </div>

        {support?.support && <SocketClient />}
        {call && <CallModal />}
        <Route exact path="/" component={Home} />
        <Route exact path="/faqs" component={Faqs} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/delete-account" component={DeleteAccount} />

        <div style={{}}>
          <PrivateRouter exact path="/login/:page" component={PageRender} />
          <PrivateRouter exact path="/login/:page/:id" component={PageRender} />
        </div>
        <div className={auth === true ? "hidden" : "visible"}>
          <Footer />
        </div>
        <div className={auth === true ? "hidden" : "visible"}>
          <SupportEngine />
        </div>
      </div>
    </Router>
  );
}

export default App;
