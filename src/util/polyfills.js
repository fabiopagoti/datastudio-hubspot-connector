// https://gist.github.com/tanaikech/70503e0ea6998083fcb05c6d2a857107
String.prototype.addQuery = function(obj) {
  return (
    this +
    Object.keys(obj).reduce(function(p, e, i) {
      return (
        p +
        (i == 0 ? "?" : "&") +
        (Array.isArray(obj[e])
          ? obj[e].reduce(function(str, f, j) {
              return (
                str +
                e +
                "=" +
                encodeURIComponent(f) +
                (j != obj[e].length - 1 ? "&" : "")
              );
            }, "")
          : e + "=" + encodeURIComponent(obj[e]))
      );
    }, "")
  );
};
