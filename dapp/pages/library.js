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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Moralis = require("moralis");
let songTokens = [
  {
    id: "1",
    owner: "0x001",
    title: "song 1",
    artist: "a 1",
    time: "12334",
    liked: false,
    artwork: "/images/test.jpg",
    forSale: false,
  },
  {
    id: "2",
    owner: "0x002",
    title: "song 2 - liked",
    artist: "a 2",
    time: "125346",
    liked: true,
    artwork: "/images/test.jpg",
    forSale: false,
  },
  {
    id: "3",
    owner: "0x003",
    title: "song 3 - for sale",
    artist: "a 3",
    time: "25436",
    liked: false,
    artwork: "/images/test.jpg",
    forSale: true,
  },
];
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
  displayPlaylist2() {
    return (
      <DragDropContext>
        <Droppable droppableId="playlist">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {songTokens.map(({ id, title, artist }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{artist}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
  displayPlaylist() {
    return (
      <DragDropContext>
        <Droppable droppableId="songTokens">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {songTokens.map(
                (
                  { id, title, artist, time, liked, artwork, forSale },
                  index
                ) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Table singleLine fixed>
                            <Table.Body>
                              <Table.Row>
                                <Table.Cell style={{ width: "60px" }}>
                                  <Icon size="big" name="play circle outline" />
                                </Table.Cell>
                                <Table.Cell>
                                  <div class="plTitle">
                                    <p>{title}</p>
                                    <p>{artist}</p>
                                  </div>
                                </Table.Cell>
                                <Table.Cell>
                                  <p>{time}</p>
                                </Table.Cell>
                                <Table.Cell>
                                  <p>Artwork...</p>
                                </Table.Cell>
                                <Table.Cell>
                                  <Icon
                                    size="large"
                                    name={liked ? "heart outline" : "heart"}
                                  />
                                </Table.Cell>
                                <Table.Cell>
                                  <Icon name="ellipsis vertical" />
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        </li>
                      )}
                    </Draggable>
                  );
                }
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
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
                {this.displayPlaylist()}
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
