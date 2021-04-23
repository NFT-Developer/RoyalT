const walletMnemonic = process.env.MNEMONIC;
import React, { Component } from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link, Router } from "../routes";
const Moralis = require("moralis");
let appId;
let serverURL;
if (!process.env.MORALIS_APP_ID) {
  const auth = require("../authentication");
  appId = auth.MORALIS_APP_ID;
  serverURL = auth.MORALIS_SERVER_URL;
} else {
  appId = process.env.MORALIS_APP_ID;
  serverURL = process.env.MORALIS_SERVER_URL;
}

class Dashboard extends Component {
  state = { userAddress: "", username: "" };

  async componentDidMount() {
    this._isMounted = true;
    console.log(appId, serverURL);
    await Moralis.initialize(appId);
    Moralis.serverURL = serverURL;
    await Moralis.Web3.authenticate();
    const user = Moralis.User.current();
    this.setState({
      userAddress: user.attributes.ethAddress,
      username: user.attributes.username,
    });
    console.log(user.get("ethAddress"));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Layout page="dashboard">
        <Grid centered columns={6} style={{ marginTop: "10px" }}>
          <Grid.Row color="black">
            <h1
              style={{
                textColor: "white",
                fontSize: "4em",
                fontWeight: "normal",
              }}
            >
              RoyalT
            </h1>
          </Grid.Row>
          <Grid.Row>
            <h2>User Address: {this.state.userAddress}</h2>
          </Grid.Row>
          <Grid.Row>
            <h2>Username: {this.state.username}</h2>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default Dashboard;
