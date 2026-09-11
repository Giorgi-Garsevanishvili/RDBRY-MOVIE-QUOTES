<?php

return [
	'fields' => [
		'text_en' => 'English quote',
		'text_ka' => 'Georgian quote',
		'movie'   => 'movie',
		'image'   => 'image',
	],
	'validation' => [
		'required'         => 'The :attribute field is required.',
		'string'           => 'The :attribute must be text.',
		'english_script'   => 'The :attribute must contain English-script text only.',
		'georgian_script'  => 'The :attribute must contain Georgian-script text only.',
		'movie_required'   => 'Select a movie.',
		'movie_invalid'    => 'The selected movie is invalid.',
		'image_required'   => 'The image field is required.',
		'image_type'       => 'The image must be a JPEG, PNG, or WebP image.',
		'image_size'       => 'The image may not be greater than 10 MB.',
	],
];
