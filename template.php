<?php
// Footheme by Adaptivethemes.com, a starter sub-sub-theme.

/**
 * Rename each function and instance of "footheme" to match 
 * your subthemes name, e.g. if you name your theme "footheme" then the function
 * name will be "footheme_preprocess_hook". Tip - you can search/replace 
 * on "footheme".
 */

/**
 * Override or insert variables into the html templates.
 */
function footheme_preprocess_html(&$vars) {
  // Load the media queries styles
  // Remember to rename these files to match the names used here - they are 
  // in the CSS directory of your subtheme.
  $media_queries_css = array(
    'footheme.responsive.style.css',
    'footheme.responsive.gpanels.css'
  );
  load_subtheme_media_queries($media_queries_css, 'footheme');

 /**
  * Load IE specific stylesheets
  * AT automates adding IE stylesheets, simply add to the array using
  * the conditional comment as the key and the stylesheet name as the value.
  *
  * See our online help: http://adaptivethemes.com/documentation/working-with-internet-explorer
  *
  * For example to add a stylesheet for IE8 only use:
  *
  *  'IE 8' => 'ie-8.css',
  *
  * Your IE CSS file must be in the /css/ directory in your subtheme.
  *
  * REMOVE or COMMENT OUT the following code if you dont want to load any IE stylesheets.
  */
  $ie_files = array(
    'lte IE 7' => 'ie-lte-7.css',
  );
  load_subtheme_ie_styles($ie_files, 'footheme');

}
