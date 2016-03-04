import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  renderRandomCards (n) {
    const components = [];
    for (var i = 0; i < n; i++) {
      components.push(
        <div>
          <Card>
            <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
              <img src="http://lorempixel.com/600/337/nature/" />
            </CardMedia>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
          <br />
        </div>

      )
    }
    return (components);
  },

  render: function () {
    return (
      <div className='greeting'>
        {this.renderRandomCards(10)}
      </div>
    );
  }
});
