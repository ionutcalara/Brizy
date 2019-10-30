<?php

class Brizy_Content_Placeholders_Permalink extends Brizy_Content_Placeholders_Simple {


	/**
	 * Brizy_Content_Placeholders_Simple constructor.
	 *
	 * @param $label
	 * @param $placeholder
	 * @param $value
	 * @param string $display
	 */
	public function __construct() {
		parent::__construct( 'Permalink', 'brizy_dc_permalink', null );
	}

	/**
	 * @param Brizy_Content_ContentPlaceholder $contentPlaceholder
	 * @param Brizy_Content_Context $context
	 *
	 * @return mixed|string
	 */
	public function getValue( Brizy_Content_Context $context, Brizy_Content_ContentPlaceholder $contentPlaceholder ) {
		$attributes = $contentPlaceholder->getAttributes();
		if ( isset( $attributes['post_id'] ) ) {
			return get_permalink( (int) $attributes['post_id'] );
		}

		return '';
	}


}