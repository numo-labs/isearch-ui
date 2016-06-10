import defaultTag from '../constants/default-tag';

export default function isHome (tags) {
  if (!Array.isArray(tags)) {
    return false;
  }

  const isHome = tags.find(tag =>
    (tag.displayName === defaultTag.displayName) &&
    (tag.id === defaultTag.id)
  );

  if (isHome) {
    return true;
  }

  return false;
}
