const walletMnemonic = process.env.MNEMONIC;
import React, { Component, useRef } from "react";
import { Grid, Container, Header, Segment, Icon, Button, Input } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link, Router } from "../routes";
import Dropzone from 'react-dropzone';
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
  constructor(props) {
    super(props);
    this.state = {
      userAddress: "",
      username: "",
      artist: "",
      title: "",
      details: ""
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

  onAudioFileDrop = (acceptedFiles) => {
    console.log(acceptedFiles)
  }

  addAudioFile() {
    const inputFile = useRef(null);
    console.log("Add audio file pressed");
  }

  onArtworkDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  }

  addArtwork() {
    console.log("Add artwork file pressed");
  }

  async createMaster() {
    console.log("Create master pressed");
    //1. Upload audio file to IPFS
    //2. Upload artwork to IPFS
    //3. Create JSON object with metadata
    //4. Upload JSON to IPFS
    //5. Create NFT with IPFS URI
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Layout page="dashboard">
        <Grid style={{ paddingRight:"150px" }}>
          <Grid.Row centered>
            <Grid.Column>
                <Header>
                  + New Master
                </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Input
                label="Artist:"
                labelPosition="left"
                style={{marginTop:"-10px", padding:"5px", width:"100%"}}
                value={this.state.artist}
                onChange={(event) =>
                  this.setState({ artist: event.target.value })
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                label="Title:"
                labelPosition="left"
                style={{padding:"5px", width:"100%"}}
                value={this.state.title}
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                }s
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                label="Details:"
                labelPosition="left"
                style={{padding:"5px", width:"100%"}}
                value={this.state.details}
                onChange={(event) =>
                  this.setState({ detailnhs: event.target.value })
                }
              />
              </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment placeholder style={{ marginTop: "-15px" }}>
                <Dropzone onDrop={this.onAudioFileDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <center>
                        <Header icon>
                          <Icon style={{marginBottom:"25px"}} name='music' />
                            Drop Audio File Here
                          </Header>
                        <Button color="purple">+ Add File</Button>
                      </center>
                    </div>
                  )}
                </Dropzone>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment placeholder style={{ marginTop: "-15px" }}>
                <Dropzone onDrop={this.onArtworkDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <center>
                        <Header icon>
                          <Icon style={{marginBottom:"-20px"}} name='file image outline' />
                          Drop Artwork Here
                        </Header>
                        <Button color="purple">+ Add File</Button>
                      </center>
                    </div>
                  )}
                </Dropzone>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <center>
                <Button size="huge" color="blue" onClick={this.createMaster}>Create Master</Button>
              </center>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default NewMaster;
