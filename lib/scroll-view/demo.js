import React, { Component } from 'react';

import ScrollView from 'scroll-view';

class Example extends Component {

  constructor () {
    super();
    this.state = {
      list: 10,
      endScroll: false
    };
    this.loadData = this.loadData.bind(this);
  }

  loadData (page) {
    if (page > 5) {
      this.setState({endScroll: true});
    } else {
      this.setState({list: this.state.list + 10});
    }
  }

  render () {
    return (
      <ScrollView loadData={this.loadData} endScroll={this.state.endScroll}>
        <div>
          {
            Array(this.state.list).fill(1).map((_, i) => <p key={i}>Hello</p>)
          }
        </div>
      </ScrollView>
    );
  }
}

export default Example;
