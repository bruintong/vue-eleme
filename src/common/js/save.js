export function saveToLocal (id, key, value) {
  let restaurant = window.localStorage.__restaurant__;
  if (!restaurant) {
    restaurant = {};
    restaurant[id] = {};
  } else {
    restaurant = JSON.parse(restaurant);
    if (!restaurant[id]) {
      restaurant[id] = {};
    }
  }
  restaurant[id][key] = value;
  window.localStorage.__restaurant__ = JSON.stringify(restaurant);
};

export function loadFromLocal (id, key, def) {
  let restaurant = window.localStorage.__restaurant__;
  if (!restaurant) {
    return def;
  }
  restaurant = JSON.parse(restaurant)[id];
  if (!restaurant) {
    return def;
  }
  let ret = restaurant[key];
  return ret || def;
}
