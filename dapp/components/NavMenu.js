import React, { Component } from "react";
import { Header, Icon, Segment, Image, Menu, Sidebar } from "semantic-ui-react";
import { Link, Router } from "../routes";

class NavMenu extends Component {
  state = {
    activeItem: this.props.page,
  };

  render() {
    const { activeItem } = this.state;

    const VerticalSidebar = ({ animation, direction, visible }) => (
      <Sidebar
        as={Menu}
        animation={animation}
        direction={direction}
        icon="labeled"
        inverted
        vertical
        visible={visible}
        width="thin"
      >
        <Menu.Item as="a">
          <Icon name="home" />
          RoyalT
        </Menu.Item>
        <Menu.Item as="a" href="/masters">
          <Icon name="upload" />
          Masters
        </Menu.Item>
        <Menu.Item as="a" href="/library">
          <Icon name="music" />
          Library
        </Menu.Item>
        <Menu.Item as="a" href="/market">
          <Icon name="shopping basket" />
          Market Place
        </Menu.Item>
      </Sidebar>
    );

    return (
      <Sidebar.Pushable as={Segment} style={{ overflow: "hidden" }}>
        <VerticalSidebar animation={"push"} direction={"left"} visible={true} />

        <Sidebar.Pusher dimmed={false}>
          <Segment>{this.props.children}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default NavMenu;
