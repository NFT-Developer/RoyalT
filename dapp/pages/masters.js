const walletMnemonic = process.env.MNEMONIC;
import React, { Component } from "react";
import { Grid, Container, Header, Segment } from "semantic-ui-react";
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

class Masters extends Component {
  state = { userAddress: "", username: "" };

  async componentDidMount() {
    this._isMounted = true;
    let user;
    await Moralis.initialize(appId);
    user = Moralis.User.current();
    if (user) {
    } else {
      Moralis.serverURL = serverURL;
      await Moralis.Web3.authenticate();
      const user = Moralis.User.current();
    }
    this.setState({
      userAddress: user.attributes.ethAddress,
      username: user.attributes.username,
    });
    console.log("Current user:", user);
    if (user) {
      this.setState({
        userAddress: user.attributes.ethAddress,
        username: user.attributes.username,
      });
      console.log(user.get("ethAddress"));
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Layout page="dashboard">
        <Grid columns={6} style={{ marginTop: "10px" }}>
          <Grid.Row>
            <Grid.Column width={10}>
              <h1
                style={{
                  fontSize: "4em",
                  fontWeight: "normal",
                }}
              >
                Masters
              </h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: "-15px" }}>
            <Grid.Column width={12}>
              <a href="/r/123">
                <Segment>Master 1</Segment>
              </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: "-15px" }}>
            <Grid.Column width={12}>
              <a href="/r/456">
                <Segment>Master 1</Segment>
              </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12} style={{ marginTop: "-15px" }}>
              <a href="/new-master">
                <Segment color="blue">+ New Master</Segment>
              </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <br />
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default Masters;
