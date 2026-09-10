<?php

return [
	'fields' => [
		'name_en'        => 'English name',
		'name_ka'        => 'Georgian name',
		'director_en'    => 'English director',
		'director_ka'    => 'Georgian director',
		'description_en' => 'English description',
		'description_ka' => 'Georgian description',
		'release_year'   => 'release year',
		'genres'         => 'genres',
		'genre'          => 'genre',
		'poster'         => 'poster',
	],
	'validation' => [
		'required'         => 'The :attribute field is required.',
		'string'           => 'The :attribute must be text.',
		'max_string'       => 'The :attribute may not be greater than :max characters.',
		'english_script'   => 'The :attribute must contain English-script text only.',
		'georgian_script'  => 'The :attribute must contain Georgian-script text only.',
		'integer'          => 'The :attribute must be a whole number.',
		'year_range'       => 'The :attribute must be between 1888 and :max.',
		'genres_required'  => 'Select at least one genre.',
		'genres_array'     => 'The selected genres are invalid.',
		'genre_invalid'    => 'A selected genre is invalid.',
		'genre_distinct'   => 'Each genre may be selected only once.',
		'poster_required'  => 'The poster field is required.',
		'poster_type'      => 'The poster must be a JPEG, PNG, or WebP image.',
		'poster_size'      => 'The poster may not be greater than 10 MB.',
	],
];
