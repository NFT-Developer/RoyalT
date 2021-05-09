const walletMnemonic = process.env.MNEMONIC;
import React, { Component } from "react";
import { Grid, Container, Header, Table} from "semantic-ui-react";
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

class Release extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddress: "",
      username: ""
    };
  }

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
        <Grid style={{ marginTop: "10px", paddingRight:"150px" }}>
          <Grid.Row color="blue">
            <Grid.Column>
              Artist<br />Title
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} color="red">
            <Grid.Column color="pink">
              Artwork
            <br />
            Royalties Sold
            <br />
            [7 / 10]
            </Grid.Column>
            <Grid.Column>
              <u>Royalty Holders:</u>
              <br />Address....... %
            </Grid.Column>
          </Grid.Row>
          <Grid.Row color="green" style={{padding: "10px"}}>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Release Title</Table.HeaderCell>
                  <Table.HeaderCell>Minted Qty.</Table.HeaderCell>
                  <Table.HeaderCell># Sold</Table.HeaderCell>
                  <Table.HeaderCell>Base Cost</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell singleLine>
                    Release Un    
                  </Table.Cell>
                  <Table.Cell>75</Table.Cell>
                  <Table.Cell>
                    1094
                  </Table.Cell>
                  <Table.Cell>
                    0.001 ETH
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell singleLine>
                    Release Un    
                  </Table.Cell>
                  <Table.Cell>75</Table.Cell>
                  <Table.Cell>
                    1094
                  </Table.Cell>
                  <Table.Cell>
                    0.001 ETH
                  </Table.Cell>
                </Table.Row>  
              </Table.Body>
            </Table>
          </Grid.Row>
          <Grid.Row color="orange">
            <Grid.Column>
              + New Releases
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              Available:<br />Name
            </Grid.Column>
            <Grid.Column>
              Cost<br />Release Date
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default Release;
