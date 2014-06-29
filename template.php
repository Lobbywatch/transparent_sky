<?php

/**
 * @file
 * Template.php - process theme data for your sub-theme.
 *
 * Rename each function and instance of "footheme" to match
 * your subthemes name, e.g. if you name your theme "footheme" then the function
 * name will be "transparent_sky_preprocess_hook". Tip - you can search/replace
 * on "footheme".
 */

/**
 * Fills the submitted variable (follows #364470).
 */
function transparent_sky_preprocess_page(&$variables) {
  // Add a word counter for the role blogger
  global $user;
  if (in_array('blogger', $user->roles) || $variables['is_admin']) {
    $variables['is_blogger'] = TRUE;
    drupal_add_js(path_to_theme() . '/js/transparent_sky-mgmt.js');
  } else {
    $variables['is_blogger'] = FALSE;
  }
}

/**
 * Override or insert variables for the html template.
 */
/* -- Delete this line if you want to use this function
function transparent_sky_preprocess_html(&$vars) {
}
function transparent_sky_process_html(&$vars) {
}
// */


/**
 * Override or insert variables for the page templates.
 */
/* -- Delete this line if you want to use these functions
function transparent_sky_preprocess_page(&$vars) {
}
function transparent_sky_process_page(&$vars) {
}
// */


/**
 * Override or insert variables into the node templates.
 */
/* -- Delete this line if you want to use these functions
function transparent_sky_preprocess_node(&$vars) {
}
function transparent_sky_process_node(&$vars) {
}
// */


/**
 * Override or insert variables into the comment templates.
 */
/* -- Delete this line if you want to use these functions
function transparent_sky_preprocess_comment(&$vars) {
}
function transparent_sky_process_comment(&$vars) {
}
// */


/**
 * Override or insert variables into the block templates.
 */
/* -- Delete this line if you want to use these functions
function transparent_sky_preprocess_block(&$vars) {
}
function transparent_sky_process_block(&$vars) {
}
// */
