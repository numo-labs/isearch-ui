// import { TAG_ADD_TAGS, TAG_REMOVE_TAG } from '../../src/constants/actionTypes';
// import { expect } from 'chai';
// import reducer from '../../src/reducers/search';
//
// const expectedInitialState = {
//   items: [],
//   bucketCount: 0,
//   status: undefined,
//   id: undefined,
//   loading: true,
//   tags: [],
//   filterVisibleState: {},
//   tiles: [],
//   addMessageVisible: false
// };
//
// describe('reducers', function () {
//   describe('tags', function () {
//     it('should return the initial state', function (done) {
//       const initialState = reducer(undefined, {});
//       expect(initialState).to.deep.equal(expectedInitialState);
//       done();
//     });
//     it('action TAG_ADD_TAGS should add tags to our state', function (done) {
//       const initialState = reducer(undefined, {type: TAG_ADD_TAGS, tags: ['a', 'b', 'c']});
//       const expectedState = {
//         ...expectedInitialState,
//         tags: ['a', 'b', 'c']
//       };
//       expect(initialState).to.deep.equal(expectedState);
//       done();
//     });
//     it('action TAG_REMOVE_TAGS shoud remove a tag from our state', function (done) {
//       const initialTags = [
//         {
//           tagName: 'this',
//           colour: 'red'
//         },
//         {
//           tagName: 'is',
//           colour: 'green'
//         },
//         {
//           tagName: 'sparta',
//           colour: 'pink'
//         }
//       ];
//       const state = reducer({tags: initialTags}, {type: TAG_REMOVE_TAG, tagName: 'sparta'});
//       const expectedState = {
//         ...expectedInitialState,
//         tags: [
//           {
//             tagName: 'this',
//             colour: 'red'
//           },
//           {
//             tagName: 'is',
//             colour: 'green'
//           }
//         ]
//       };
//       expect(state).to.deep.equal(expectedState);
//       done();
//     });
//   });
// });
