import React, { Component } from 'react';

import InfiniteScrollGridContainer from '../lib/scroll-view/gridContainer.js';

class Example extends Component {

  render () {
    const items = [
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 1</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 2</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 3</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 4</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 5</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 6 </div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 7</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 8</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 9</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 10</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 11</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 12</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 13</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 14</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 15</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 16</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 17</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 18</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 19</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 20</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 21</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 22</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 23</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 24</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 25 </div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 26</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 27</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 28</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 29</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 30</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 31</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 32</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 33</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 34</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 35</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 36</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 37</div>,
      <div style={{backgroundColor: 'red', height: '100px', width: '100px', display: 'inline-block'}}>Item 38</div>
    ];
    return (
      <InfiniteScrollGridContainer
        itemWidth={100}
        itemHeight={100}
        itemsPerPage={9}
        items={items}
      />
    );
  }
}

export default Example;
