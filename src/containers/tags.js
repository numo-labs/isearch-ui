import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Tags from 'tags';
import * as TagsActions from '../actionCreators/tags.js';

class TagsContainer extends Component {
  render () {
    const { removeTag, tags } = this.props;
    return (<Tags
      removeTag={removeTag}
      tags={tags}
      />
    );
  }
}

TagsContainer.propTypes = {
  removeTag: PropTypes.func,
  tags: PropTypes.array
};

function mapStateToProps (state) {
  return ({
    tags: state.filter.tags
  });
}

export default connect(mapStateToProps, TagsActions)(TagsContainer);
