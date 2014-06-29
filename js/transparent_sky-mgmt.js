// Adds Word counter for the node content
(function ($) {
  Drupal.behaviors.bodycountnode = {
    attach: function (context, settings) {
      //alert("loaded");
      $('.article .meta .submitted', context).dblclick(function (event) {
        //alert("clicked");
        // Create a bbcode url for this article
        var $shortlink = $('link[rel=shortlink]');
        var title = $('meta[property~=dc:title]').attr('content');
        var url = location.protocol + '//' + location.host + ($shortlink.length /*exists?*/ ? $shortlink.attr('href') : '');
        var aliasedUrl = window.location.href;
        var bburl = '[url=' + url + ']' + title + '[/url]';
        var bburlUTM = '[url=' + url + '?utm_source=msg&utm_medium=forum&utm_campaign=data' + ']' + title + '[/url]';
        var msg = bburl;

        msg += "\n" + bburlUTM;

        var mdurl = '[' + title + '](' + url + ')';
        msg += "\n" + mdurl;

        msg += "\n" + aliasedUrl + '?utm_source=facebook&utm_medium=facebook&utm_campaign=data';
        msg += "\n" + aliasedUrl + '?utm_source=gplus&utm_medium=gplus&utm_campaign=data';

        // replace(/></ig, '> <') is necessary in order to workaround block tag problems, e.g. <p>X</p><p>Y</p>.
        // Without the replace() we would get one word XY instead of X Y.
        // .node .content .field-name-body or for adaptive themes: .article
        var $content = $('.article .field-name-body, .node .content .field-name-body');
        var words = $.trim($content.html($content.html().replace(/></ig, '> <')).text()).split(/\s+/).length;
        msg += "\n" + words + " word(s)";

        alert(msg);

        /*var t;
        if ($("#edit-body-count").length == 0) {
            t = $("<p id=\"edit-body-count\"></p>");
            $(this).before(t);
        } else {
            t = $("#edit-body-count");
        }
        t.html( + " word(s)");*/
      });
    }
  };

  /**
   * On double click show publication linkings. Using jQuery.
   * Created 03.11.2009 by ibex, mod 26.12.2009
   * Adapted for ps.ch 11.08.2012 by ibex
   */
  Drupal.behaviors.cite = {
    attach: function (context, settings) {
      /* Show link on dblclick */
      $("li[id]").dblclick(function() {
        //var curhref = window.location.href;
        var idPubl = $(this).attr("id");
        var $shortlink = $('link[rel=shortlink]');
        //var nodetitle = $('meta[property~=dc:title]').attr('content');
        var relurl = $shortlink.length /*exists?*/ ? $shortlink.attr('href') : '';
        var url = location.protocol + '//' + location.host + relurl;
        var refSite = relurl + "#" + idPubl;
        var ref = url + "#" + idPubl;
        var title = $(this).find("strong").text();
        var full = $(this).text();
        // Strip tags: http://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
        var info = $.trim($(this).html().replace(/<br\/?>.*/im, "").replace(/(<([^>]+)>)/igm,"").replace(/(books\.ch|amazon\.(com|de)\*?|#)/igm,""));
        alert("Link:\n" + ref + "\n\n" +
        "MD rel:\n[" + title + "](" + refSite + " \"" + info  + "\")\n\n" +
        "MD:\n[" + title + "](" + ref + " \"" + info  + "\")\n\n" +
        "HTML:\n<a href=\"" + ref +"\" title=\"" + info + "\">" + title + "</a>\n\n" +
        "HTML rel:\n<a href=\"" + refSite + "\" title=\"" + info + "\">" + title + "</a>\n\n" +
        "HTML page:\n<a href=\"" + "#" + idPubl +"\" title=\"" + info + "\">" + title + "</a>\n\n" +
        "BBCode:\n[url=" + ref + "]" + title + "[/url]\n\n" +
        "BBCode medium:\n" + info + " [url=" + ref + "]" + title + "[/url]\n\n" +
        "BBCode full:\n" + full + " [url=" + ref + "]" + title + "[/url]");
      })
    }
  };

  /**
   * Map key 'e' to edit node.
   * Pressing the key 'e' on a node will load the node edit form.
   *
   * For save shortcut see in ibexutils.js.
   */
  Drupal.behaviors.shortcuts = {
    attach: function (context, settings) {
      // Key codes: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
      //alert("shortcut");
      $(window, context).keypress(function(event) {
        //console.log( event );
        var url;
        //alert('href: ' + $('link[rel=shortlink]').attr("href"));
        if (event.charCode == 101 && event.ctrlKey && (url = $('link[rel=shortlink]').attr("href")) != undefined) {
          //var $article = $(this).find('.article').first();
          //alert("Handler for .keypress() called. " + url);
          window.location.href = url + '/edit';
          //window.location.href += '#overlay=' + url + '/edit';
        } else if (event.charCode == 101 && event.ctrlKey && (url = $('.view-last-modifed-articles .field-content a').first().attr("href")) != undefined) {
          window.location.href = url;
        }
     });
    }
  };

  /* Add Google Schoolar. Using jQuery. 26.12.2009 by ibex */
  /*$(document).ready( function() {
    $("li.publ").each( function (i) {
      var q = "http://scholar.google.com/scholar?as_q=%22"  + $(this).find("em.publtitle").text().replace(/ /g, "+") + "%22&as_sauthors=" + $(this).find("span.publauthors").text().split(" ", 1)[0];
      $(this).find("span.miscinfo").append(" <a class=\"small\" href=\"" + q + "\" title=\"Click to search Google Scholar for this entry\">Google Scholar</a>");
      // not requiered: &btnG=Search+Scholar&as_epq=&as_oq=&as_eq=&as_occt=any
    });
  });*/

  /* Collapse/Expand all Using jQuery. 25.12.2009 by ibex */
  /*function toggle_expand_all() {
    / *$('.content .collapsible:first').css("color","red");* /
    if ($('.content .collapsible:first').hasClass('collapsed')) {
      $('.content .collapsible').removeClass('collapsed');
    } else {
      $('.content .collapsible').addClass('collapsed');
    }
    / *No load by default of link* /
    return false;
  }*/
})(jQuery);
