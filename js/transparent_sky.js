/**
 * Transparent Sky theme Javascript goes here.
 */


(function ($) {
  Drupal.behaviors.imgchangeonhover = {
    attach: function (context, settings) {

      /*
      * Exchanges an image with another having a _hover suffix in img.change-on-hover
      * images while hovering.
      * Reference: http://stackoverflow.com/questions/540349/change-the-image-source-using-jquery
      */
      $('img.change-on-hover').once('change-on-hover', function() {
        var $t = $(this);
        var src = $t.attr('src'); // initial src
        var baseName = src.substring(0, src.lastIndexOf('.')); // let's get file name without extension
        $t.hover(function() {
            $(this).attr('src', baseName + '_hover.' + /[^.]+$/.exec(src)); //last part is for extension
        }, function() {
            $(this).attr('src', baseName + '.' + /[^.]+$/.exec(src)); //removing '-over' from the name
        });
      });

      /* On hover set the data-hover attribute as src.
       *
       * Hover using HTML5 data-* attributes.
       */
      $('img.change-on-hover-data').once('change-on-hover-data', function() {
        var orig = $(this).attr('src'); // initial src
        // Extract the hover src from data-hover HTML5 attribute
        var hover = $(this).attr('data-hover');
        $(this).hover(function() {
          // Set hover src on hover event
          $(this).attr('src', hover);
        }, function() {
        // Restore orig src on hover exit event
          $(this).attr('src', orig);
        });
      });

      /* Fade-in effect for images. */
      $('img.fade-in').once('fade-in', function() {
        $(this).fadeIn(800);  // ms
      });

      /* Slide-in effect for images. */
      $('img.slide-in').once('slide-in', function() {
        $(this).slideDown(800);  // ms
      });

    }
  };

  /**
  * For expandable blocks.
  * See http://drupal.org/node/1092140
  */
  Drupal.behaviors.fancycode = {
   attach: function (context, settings) {
    /*$("div.codeblock").hover(
      function () {
        $(this).animate({ width: "950px"}, 250, function() { $(this).css('overflow-x', 'visible'); });
      },
      function () {
        $(this).css('overflow-x', 'hidden').animate({ width: "630px" }, 250);
      }
    );*/
    $(".content div.codeblock, .content .expandable, .content .prettycode", context).once('codeblock', function(){
      var contentwidth = $(this).contents().width();
      var blockwidth = $(this).width();
      if (blockwidth == 0) {
          blockwidth = $(this).parent().width();
      }
      // alert('width ' + contentwidth + ' / ' + blockwidth);
      if(contentwidth > blockwidth || contentwidth == null) {
        $(this).hover(function() {
            // 960px - 15px padding on either side - 1px for border on either side
            $(this).animate({ width: "918px"}, 250, function() { $(this).css('overflow-x', 'auto'); });
          }, function() {
            $(this).css('overflow-x', 'hidden').animate({ width: blockwidth }, 250);
        });
      }
    });
   }
  };

  /**
  * Tablesorter
  * http://tablesorter.com
  */
  Drupal.behaviors.tablesorter = {
    attach: function (context, settings) {
      $("table.tablesorter").tablesorter();
      $("table.tablesorter-zebra").tablesorter({widgets: ['zebra']});
      $(".tablesorter > table").not("table.sticky-header").tablesorter();
      $(".tablesorter-zebra > table").not("table.sticky-header").tablesorter({widgets: ['zebra']});
    }
  };


  /**
   * Attaches sticky table headers.
   * Copied from misc/tableheader.js
   */
  Drupal.behaviors.tableHeader = {
    attach: function (context, settings) {
      if (!$.support.positionFixed) {
        return;
      }

      $('.header-sticky-enabled table', context).once('tableheader', function () {
        $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
      });

      $('table.header-sticky-enabled', context).once('tableheader', function () {
        $(this).data("drupal-tableheader", new Drupal.tableHeader(this));
      });
    }
  };

  /**
   * If #comments are selected in the URL, uncollapse comments on page load.
   */
  Drupal.behaviors.uncollapseComments = {
    attach: function (context, settings) {
      //alert('Call: ' + location.hash);
      // #comments or #comment-
      if ((location.hash == '#comments') || (location.hash.substring(0, 9) == '#comment-')) {
        // Uncollapse
        $('#comments fieldset.collapsible', context).removeClass('collapsed');
      }
    }
  };

  /**
   * Add # with a self link to the Buchtipps page.
   */
  Drupal.behaviors.ref_anchor = {
    attach: function (context, settings) {
      // No hover
      $(".not-front .article li[id]").not(".not-front .article .footnotes li").once('ref-anchor', function() {
        var ref = window.location.href;
        ref = ref.replace(/#.*$/,"") + "#" + $(this).attr("id");
        $(this).html($(this).html() + " <a href=\"" + ref + "\" class=\"no-print\" title=\"Link zu diesem Aufzählungselement\">#</a>");
      });

      // Width hover
      $(".not-front .article h2[id], .not-front .article h3[id], .not-front .article h4[id]").once('ref-anchor', function() {
        var ref = window.location.href;
        ref = ref.replace(/#.*$/,"") + "#" + $(this).attr("id");
        $(this).html($(this).html() + " <a href=\"" + ref + "\" class=\"no-print on-hover\" title=\"Link zu diesem Titel\">#</a>");
      });
    }
  };

  /**
   * Fix del unterline.
   * Ref: http://stackoverflow.com/questions/1823341/how-do-i-get-this-css-text-decoration-override-to-work/1823388#1823388
   */
//   Drupal.behaviors.fix_del_underline = {
//     attach: function (context, settings) {
//       $("del").wrapInner('<span class="del-inner" />');
//     }
//   };

  Drupal.behaviors.search_icon = {
    attach: function (context, settings) {
      var ua = $.browser;
      if (ua.mozilla || ua.msie) {
        $('form input#google-search').addClass('show-search-icon');
      }
    }
  };

  /**
   * Activate Google Code Prettify.
   *
   * Works around problem Drupal codefilter module which cannot nest code tag due to
   * inner ending tag aboring code escaping permaturely.
   * Encode with write &lt;/code> instead </code>
   *
   * https://code.google.com/p/google-code-prettify/
   *
   * Inspiration from: http://engineeredweb.com/blog/switching-from-pygments-to-prettify/
   */
// TODO enable pretty print again
//   Drupal.behaviors.activate_prettify= {
//       attach: function (context, settings) {
//           // Add pretty print to all pre and code tags.
//           $('.prettyprint > .codeblock > code' /* +', .prettyprint > .codeblock > pre'*/).once('prettyprint', function() {
//               // Copy classes of parent parent class, incl prettyprint
//               // Parent: div.codeblock form Drupal codefilter module
//               // Parent parent: div.prettyprint which can contain the language spec
//               $(this).addClass($(this).parent().parent().attr('class'));
//
//               // Workaround codefilter problem with nested code tags
//               // Assume the end tag is escaped with &lt;code>
//               $(this).html($(this).html().replace(/&amp;lt;\/code&gt;/, '&lt;/code&gt;'));
//           });
//
//           $('.prettycode').once('prettycode', function() {
//               // Copy classes of parent parent class, incl prettyprint
//               // Parent: div.codeblock form Drupal codefilter module
//               // Parent parent: div.prettyprint which can contain the language spec
//               $(this).addClass('prettyprint');
//           });
//
//           // Remove prettify from code tags inside pre tags.
//           $('.prettyprint > pre > code').removeClass("prettyprint");
//
//           // Activate pretty presentation.
//           prettyPrint();
//       }
//   };

//   alert('Passed transperent_sky');

// Autocomplete autosubmit, Ref: https://drupal.org/node/1772490
  $(document).ready(function(){
//     alert('Installed Drupal.jsAC.prototype.select');
    // Adapted from Drupal autocomplete.js
    Drupal.jsAC.prototype.select = function (node) {
//       alert('Passed Drupal.jsAC.prototype.select');
      this.input.value = $(node).data('autocompleteValue');
      if(jQuery(this.input).hasClass('auto_submit')){
        this.input.form.submit();
      }
    };
  });

  })(jQuery);


/** Ref: http://stackoverflow.com/questions/1219860/javascript-jquery-html-encoding */
function htmlEscape(str) {
    return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Ref: http://stackoverflow.com/questions/1219860/javascript-jquery-html-encoding */
function convertEOL(str) {
    return String(str).replace(/\n/g, '<br>');
}

/**
 * Escapes the string and wraps it into a code tag.
 *
 * I had to outsource this due to problems with SmartyPants changing quotes of the scripts.
 */
function escapedCodeTag(str) {
    return '<code class="language-javascript" style="background: none;">' + htmlEscape(str) + '</code>';
}
