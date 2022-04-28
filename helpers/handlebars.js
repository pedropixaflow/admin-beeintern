module.exports = {
  helpers: {
    is: function (a, b, opts) {
      if (a == b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    },
  },
  defaultLayout: "main",
};
