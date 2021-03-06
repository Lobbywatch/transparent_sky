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
 * Override or insert variables into the node templates.
 */
function transparent_sky_preprocess_node(&$vars) {
  $node = $vars['node'];
  // From node.module template_preprocess_node
  $vars['date'] = format_date($node->created, 'short_date');

  //
  // AT Core builds additional time and date variables for use in templates
  //
  // datetime stamp formatted correctly to ISO8601
//   $vars['datetime'] = format_date($vars['created'], 'custom', 'Y-m-d\TH:i:sO'); // PHP 'c' format is not proper ISO8601!

  // Publication date, formatted with time element
//   $vars['publication_date'] = '<time datetime="' . $vars['datetime'] . '" pubdate="pubdate">' . $vars['date'] . '</time>';

  // Last update variables
//   $vars['datetime_updated'] = format_date($vars['node']->changed, 'custom', 'Y-m-d\TH:i:sO');
//   $vars['custom_date_and_time'] = date('jS F, Y - g:ia', $vars['node']->changed);

  // Last updated formatted in time element
//   $vars['last_update'] = '<time datetime="' . $vars['datetime_updated'] . '" pubdate="pubdate">' . $vars['custom_date_and_time'] . '</time>';

  // Build the submitted variable used by default in node templates
  if (variable_get('node_submitted_' . $vars['node']->type, TRUE)) {
	$param = array(
	  '!username' => $vars['name'],
	  '!datetime' => '<time datetime="' . $vars['datetime'] . '" pubdate="pubdate">' . l(format_date($node->created, 'medium_date'), 'node/'. $node->nid, array('alias' => TRUE, 'attributes' => array('rel' => 'bookmark'))) . '</time>',
	  '!modified' => '<time datetime="' . $vars['datetime_updated'] . '">' . format_date($node->changed, 'medium_date') . '</time>'
	);

	$vars['submitted'] = format_date($node->created, 'short_date') == format_date($node->changed, 'short_date') ? t("!username – !datetime", $param) : t("!username – !datetime (modified on !modified)", $param);
//     $vars['submitted'] = t("!datetime (modified on !modified) – !username",
//       array(
//         '!username' => $vars['name'],
//         '!datetime' => $vars['publication_date'],
//       )
//     );
  }
  else {
    $vars['submitted'] = '';
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
