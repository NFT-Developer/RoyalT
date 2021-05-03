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

class NewMaster extends Component {
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
      user = Moralis.User.current();
    }
    this.setState({
      userAddress: user.attributes.ethAddress,
      username: user.attributes.username,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Layout page="dashboard">
        <Grid columns={6} style={{ marginTop: "10px" }}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Grid.Row>
                <h1
                  style={{
                    fontSize: "4em",
                    fontWeight: "normal",
                  }}
                >
                  + New Master
                </h1>
                <h2>Address:{this.state.userAddress}</h2>
              </Grid.Row>
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

export default NewMaster;
