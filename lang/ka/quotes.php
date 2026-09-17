<?php

return [
	'fields' => [
		'text_en' => 'ინგლისური ციტატა',
		'text_ka' => 'ქართული ციტატა',
		'movie'   => 'ფილმი',
		'image'   => 'სურათი',
	],
	'validation' => [
		'required'         => ':attribute სავალდებულოა.',
		'string'           => ':attribute ტექსტი უნდა იყოს.',
		'english_script'   => ':attribute მხოლოდ ინგლისურ დამწერლობას უნდა შეიცავდეს.',
		'georgian_script'  => ':attribute მხოლოდ ქართულ დამწერლობას უნდა შეიცავდეს.',
		'movie_required'   => 'აირჩიეთ ფილმი.',
		'movie_invalid'    => 'არჩეული ფილმი არასწორია.',
		'image_required'   => 'სურათი სავალდებულოა.',
		'image_type'       => 'სურათი უნდა იყოს JPEG, PNG ან WebP გამოსახულება.',
		'image_size'       => 'სურათი არ უნდა აღემატებოდეს 10 მბ-ს.',
	],
];
