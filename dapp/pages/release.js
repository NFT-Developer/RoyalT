const walletMnemonic = process.env.MNEMONIC;
import React, { Component } from "react";
import { Grid, Container, Header, Table, Image} from "semantic-ui-react";
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
        <Grid style={{ paddingRight:"150px" }}>
          <Grid.Row color="blue">
            <Grid.Column>
              <h2 class="down10">Artist</h2>
              <h3 class="up10">Title</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} color="red">
            <Grid.Column color="pink">
              <Image size="medium" src='https://react.semantic-ui.com/images/wireframe/image.png' />
              <br />
              Royalties Sold
              <br />
              [7 / 10]
            </Grid.Column>
            <Grid.Column>
              <u>Royalty Holders:</u>
              <ul>
                <li>Address0 ....... 90%</li>
                <li>Address1 ....... 1%</li>
                <li>Address2 ....... 0.9%</li>
                <li>Address3 ....... 0.8%</li>
                <li>Address4 ....... 0.7%</li>
              </ul>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row color="green" style={{padding: "10px"}}>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Release Title</Table.HeaderCell>
                  <Table.HeaderCell>Minted Qty.</Table.HeaderCell>
                  <Table.HeaderCell>Originals Sold</Table.HeaderCell>
                  <Table.HeaderCell># Resales</Table.HeaderCell>
                  <Table.HeaderCell>Base Cost</Table.HeaderCell>
                  <Table.HeaderCell>Resale Fee</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell singleLine>
                    Release 1    
                  </Table.Cell>
                  <Table.Cell>75</Table.Cell>
                  <Table.Cell>
                    75
                  </Table.Cell>
                  <Table.Cell>
                    1094
                  </Table.Cell>
                  <Table.Cell>
                    0.001 ETH
                  </Table.Cell>
                  <Table.Cell>
                    10%
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell singleLine>
                    Release 2    
                  </Table.Cell>
                  <Table.Cell>75</Table.Cell>
                  <Table.Cell>
                    60
                  </Table.Cell>
                  <Table.Cell>
                    14
                  </Table.Cell>
                  <Table.Cell>
                    0.001 ETH
                  </Table.Cell>
                  <Table.Cell>
                    10%
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
          <Grid.Row color="orange" columns={2}>
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
