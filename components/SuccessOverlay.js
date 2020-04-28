import React from 'react';
import { Overlay, Text } from 'react-native-elements';

<Overlay isVisible={this.state.isVisible}>
  <Text>Hello from Overlay!</Text>
</Overlay>;

{
  this.state.visible && (
    <Overlay isVisible>
      <Text>Hello from Overlay!</Text>
    </Overlay>
  );
}

<Overlay
  isVisible={this.state.isVisible}
  windowBackgroundColor="rgba(255, 255, 255, .5)"
  overlayBackgroundColor="red"
  width="auto"
  height="auto"
>
  <Text>Hello from Overlay!</Text>
</Overlay>;

<Overlay
  isVisible={this.state.isVisible}
  onBackdropPress={() => this.setState({ isVisible: false })}
>
  <Text>Hello from Overlay!</Text>
</Overlay>;
