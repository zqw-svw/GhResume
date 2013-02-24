(function() {
  var $, api_url, desktoppr_api, username;

  $ = jQuery;

  api_url = "https://api.github.com/users/";

  username = url("?").replace(/^\/|\/$/g, '');

  if (!username) {
    username = "hit9";
  }

  desktoppr_api = "https://api.desktoppr.co/1/wallpapers/random";

  $.getJSON(desktoppr_api, function(res) {
    return $("body").css("background-image", "url(" + res.response.image.url + ")");
  });

  $.getJSON(api_url + username, function(res) {
    var avatar_url, followers, name;
    $(document).attr("title", res.login + "'s " + document.title);
    avatar_url = "https://secure.gravatar.com/avatar/" + res.gravatar_id + "?size=170";
    $("#avatar").attr("src", avatar_url);
    if (res.name) {
      name = res.name;
    } else {
      name = username;
    }
    $("#name").html("<a href=\"https://github.com/" + username + "\">" + name + "</a>");
    if (res.location) {
      $("ul#user-info").append("      <li>        <i class=\"icon-map-marker icon-white\"></i>        " + res.location + "      </li>        ");
    }
    if (res.email) {
      $("ul#user-info").append("      <li>        <i class=\"icon-envelope icon-white\"></i>        " + res.email + "      </li>        ");
    }
    if (res.company) {
      $("ul#user-info").append("      <li>        <i class=\"icon-user icon-white\"></i>        " + res.company + "      </li>        ");
    }
    if (res.blog) {
      $("ul#user-info").append("      <li>        <i class=\"icon-home icon-white\"></i>        <a href=\"" + res.blog + "\" >" + res.blog + "</a>      </li>");
    }
    if (res.followers >= 1000) {
      followers = (res.followers / 1000).toFixed(1) + "k";
    } else {
      followers = res.followers;
    }
    return $("#follower-number").text(followers);
  });

  $.getJSON(api_url + username + "/repos", function(res) {
    var homepage, key, lang, language, repo, size, tuple_arr, value, _i, _j, _len, _len1, _ref;
    res.sort(function(a, b) {
      var ap, bp;
      ap = a.watchers_count + a.forks_count;
      bp = b.watchers_count + b.forks_count;
      return bp - ap;
    });
    _ref = res.slice(0, 5);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      repo = _ref[_i];
      homepage = "";
      if (repo.homepage) {
        homepage = "<a href=\"" + repo.homepage + "\" ><i class=\"icon-home icon-white\" ></i></a>";
      }
      language = "";
      if (repo.language) {
        language = "<span id=\"language\"> (" + repo.language + ")</span>";
      }
      $("#repolist").append("        <li style=\"display: list-item;\" class=\"singlerepo\">          <ul class=\"repo-stats\">            <li class=\"stars\">              <i class=\"icon-star icon-white\"></i>" + repo.watchers_count + "            </li>              <li class=\"forks\">              <i class=\"icon-share-alt icon-white\"></i>              " + repo.forks_count + "            </li>              <li class=\"created_time\">              <i class=\"icon-time icon-white\"></i>" + repo.created_at.substring(0, 10) + "            </li>              </ul>          <h3>            <a href=\"https://github.com/" + username + "/" + repo.name + "\">            " + repo.name + language + "            </a>              </h3>          <p id=\"description\">" + homepage + "&nbsp;" + repo.description + "</p>        </li>      ");
    }
    lang = [];
    size = 0;
    for (_j = 0, _len1 = res.length; _j < _len1; _j++) {
      repo = res[_j];
      if (repo.language) {
        if (!lang[repo.language]) {
          lang[repo.language] = 0;
        }
        lang[repo.language] += 1;
      }
      size += 1;
    }
    tuple_arr = [];
    for (key in lang) {
      value = lang[key];
      tuple_arr.push([key, value]);
    }
    tuple_arr.sort(function(a, b) {
      return b[1] - a[1];
    });
    $("#repos-count").text(size);
    $("h1#name").append("&nbsp; <span>(" + tuple_arr[0][0] + ")</span>");
    return $.getJSON("vendors/github-language-colors/colors.json", function(clr) {
      var item, l, n, _k, _len2, _ref1, _results;
      _ref1 = tuple_arr.slice(0, 6);
      _results = [];
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        item = _ref1[_k];
        l = item[0];
        n = item[1];
        _results.push($("#skills ul#lang-container").append("<li> <div style=\"background-color:" + clr[l] + "; \"> " + parseInt(n / size * 100) + "% </div><span>" + l + "</span></li>"));
      }
      return _results;
    });
  });

}).call(this);

// Generated by CoffeeScript 1.5.0-pre
