var GeoPattern = require("geopattern");
//var StickySidebar = require("sticky-sidebar");
var ClipboardJS = require("clipboard");
var Gumshoe = require("gumshoejs");

function sel(str) {
  return document.querySelectorAll(str);
}

function getScrollY() {
  var supportPageOffset = window.pageYOffset !== undefined;
  var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
  return supportPageOffset
    ? window.pageYOffset
    : isCSS1Compat
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
}

var scroll = function() {
  var scroll_pos = getScrollY();

  if (scroll_pos > 70) {
    sel(".header")[0].classList.add("scrolled");
  } else {
    sel(".header")[0].classList.remove("scrolled");
  }
};

// Random string generator
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function ready() {
  document.addEventListener("scroll", scroll);

  var header = sel(".header")[0];

  // Todo: Style this nicely
  var spy = new Gumshoe("#local-toc ul a", {
    offset: function() {
      return header.getBoundingClientRect().height + 10;
    }
  });

  //TODO: Update the plugin
  /*var sidebar = new StickySidebar("#sidebar", {
    containerSelector: "#main-content",
    innerWrapperSelector: ".sidebar_wrapper",
    topSpacing: 80,
    bottomSpacing: 20
  });*/

  // Find all elements with class geopattern and give them a geopattern
  // If they don't have
  var patternId;
  sel(".geopattern").forEach(function(item, index) {
    patternId = item.hasAttribute("data-pattern-id")
      ? item.getAttribute("data-pattern-id")
      : makeid(10);
    item.style.backgroundImage = GeoPattern.generate(patternId).toDataUrl();
  });
}

if (document.readyState != "loading") {
  ready();
} else {
  document.addEventListener("DOMContentLoaded", ready);
}
