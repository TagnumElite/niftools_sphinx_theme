var GeoPattern = require("geopattern");
var ClipboardJS = require("clipboard");
var Gumshoe = require("gumshoejs");

function sel(query) {
  return document.querySelectorAll(query);
}

function sel1(query) {
  return document.querySelector(query);
}

function clamp(min, value, max) {
  return Math.min(Math.max(value, min), max);
}

function addClass(ele, cls) {
  if (ele.classList) {
    ele.classList.add(cls);
  } else {
    arr = ele.className.split(" ");
    if (arr.indexOf(cls) == -1) {
      ele.className += " " + cls;
    }
  }
}

function rmClass(ele, cls) {
  if (ele.classList) {
    ele.classList.remove(cls);
  } else {
    ele.className = ele.className.replace(cls, ""); // For IE9 and earlier
  }
}

function hasClass(ele, cls) {
  if (ele.classList) {
    return ele.classList.contains(cls);
  } else {
    var i = ele.className.split(" ").indexOf(cls);
    if (i >= 0) return true;
    return false;
  }
}

function tglClass(ele, cls) {
  if (ele.classList) {
    ele.classList.toggle(cls);
  } else {
    // For IE9
    var classes = ele.className.split(" ");
    var i = classes.indexOf(cls);

    if (i >= 0) classes.splice(i, 1);
    else classes.push(cls);
    ele.className = classes.join(" ");
  }
}

function getChildren(ele, tp) {
  return ele.children.filter(function(x) {
    return x.tagName.toLowerCase() === tp;
  });
}

function getHeight(ele) {
  return parseFloat(getComputedStyle(ele, null).height.replace("px", ""));
}

var getScrollY = function() {
  var supportPageOffset = window.pageYOffset !== undefined;
  var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
  return supportPageOffset
    ? window.pageYOffset
    : isCSS1Compat
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
};

var header = sel1(".header");
var sidebar = sel1(".sphinxsidebar");
var sidebar_wrapper = sel1(".sphinxsidebarwrapper");
var header_offset = header.getBoundingClientRect().height + 10;

var scroll = function() {
  var scroll_pos = getScrollY();

  if (scroll_pos > header.clientHeight) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (sidebar && sidebar_wrapper) {
    // Get height of sidebar wrapper
    var height = getHeight(sidebar_wrapper);
    // Get offset of sidebar from top
    var offset = sidebar.offsetTop;
    // Find the bottom of the window from scroll position and window inner height
    var window_bottom = scroll_pos + window.innerHeight;
    // Get offset of sidebar wrapper from top
    var top = sidebar_wrapper.offsetTop;
    // Get bottom of sidebar wrapper by adding top plus height
    var bottom = top + height;

    // Does the sidebar fit in the window + header?
    if (height < window.innerHeight + header.clientHeight) {
      // If so, just go 10px below header.
      sidebar_wrapper.style.top = header.clientHeight + 10 + "px";
    } else {
    }
  }
};

var previous_hash;

function hash() {
  if (window.location.hash) {
    var hash = window.location.hash,
      id = hash.slice(1),
      elem = document.getElementById(id),
      hashlink =
        "<div id=" +
        id +
        ` style="height: ${header_offset}px; margin-top: -${header_offset}px; visibility: hidden;"></div>`;

    if (previous_hash) {
      previous_hash.nextElementSibling.id = previous_hash.id;
      previous_hash.remove();
    }

    elem.removeAttribute("id");
    elem.insertAdjacentHTML("beforebegin", hashlink);
    previous_hash = elem.previousElementSibling;
    window.location.hash = hash;
  }
}

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
  scroll();
  window.addEventListener("hashchange", hash);
  hash();

  if (sel1("#local-toc")) {
    var spy = new Gumshoe("#local-toc ul a", {
      offset: function() {
        return header_offset;
      },
      nested: true
    });
  }

  // Find all elements with class geopattern and give them a geopattern
  // If they don't have
  var patternId;
  sel(".geopattern").forEach(function(item, index) {
    patternId = item.hasAttribute("data-pattern-id")
      ? item.getAttribute("data-pattern-id")
      : makeid(10);
    item.style.backgroundImage = GeoPattern.generate(patternId).toDataUrl();
  });

  var toggle = sel1("li.toggle");
  if (toggle) {
    toggle.firstElementChild.addEventListener("click", event => {
      console.log("true");
      var items = sel(".item");
      items.forEach(function(item, idx) {
        if (hasClass(item, "active")) {
          rmClass(item, "active");
          //this. Change icon
        } else {
          addClass(item, "active");
          // Change icon
        }
      });
    });
  }
}

if (document.readyState != "loading") {
  ready();
} else {
  document.addEventListener("DOMContentLoaded", ready);
}
