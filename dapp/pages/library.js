const walletMnemonic = process.env.MNEMONIC;
import React, { Component } from "react";
import {
  Grid,
  Container,
  Header,
  Segment,
  Dropdown,
  Menu,
  Table,
  Icon,
} from "semantic-ui-react";
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

class Library extends Component {
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
      <Layout page="library">
        <Grid style={{ marginTop: "10px" }}>
          <Grid.Row>
            <Grid.Column>
              <Grid.Row>
                <h1>My Library</h1>
                <h2>Address:{this.state.userAddress}</h2>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div class="infoPane outlineView">Info Pane</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row width={4} columns={1}>
            <Grid.Column color="blue">
              <div class="playlistView outlineView">
                <Menu size="mini" vertical>
                  <Dropdown item text="Playlists">
                    <Dropdown.Menu>
                      <Dropdown.Item>+ New</Dropdown.Item>
                      <Dropdown.Item>All Songs</Dropdown.Item>
                      <Dropdown.Item>Favorites</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>
                <Table singleLine>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Icon size="big" name="play circle outline" />
                      </Table.Cell>
                      <Table.Cell>
                        <Icon name="add" />
                      </Table.Cell>
                      <Table.Cell>
                        <p>Track1</p>
                        <p>Artist</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p>1:32</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p>Artwork...</p>
                      </Table.Cell>
                      <Table.Cell>
                        <Icon size="large" name="heart outline" />
                      </Table.Cell>
                      <Table.Cell>
                        <Icon name="ellipsis vertical" />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon size="big" name="play circle outline" />
                      </Table.Cell>
                      <Table.Cell>
                        <Icon name="add" />
                      </Table.Cell>
                      <Table.Cell>
                        <p>Track2</p>
                        <p>Artist</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p>1:32</p>
                      </Table.Cell>
                      <Table.Cell>
                        <p>Artwork...</p>
                      </Table.Cell>
                      <Table.Cell>
                        <Icon size="large" name="heart outline" />
                      </Table.Cell>
                      <Table.Cell>
                        <Icon name="ellipsis vertical" />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
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

export default Library;
