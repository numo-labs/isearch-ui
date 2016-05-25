export default function storageMock () {
  var storage = {};
  return {
    setItem: function (key, value) {
      storage[key] = value || '';
    },
    getItem: function (key) {
      return storage[key] || null;
    }
  };
}
