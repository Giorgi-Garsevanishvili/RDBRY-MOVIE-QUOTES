<?php

return [
	'fields' => [
		'name_en'        => 'ინგლისური სახელი',
		'name_ka'        => 'ქართული სახელი',
		'director_en'    => 'ინგლისური რეჟისორი',
		'director_ka'    => 'ქართული რეჟისორი',
		'description_en' => 'ინგლისური აღწერა',
		'description_ka' => 'ქართული აღწერა',
		'release_year'   => 'გამოშვების წელი',
		'genres'         => 'ჟანრები',
		'genre'          => 'ჟანრი',
		'poster'         => 'პოსტერი',
	],
	'validation' => [
		'required'         => ':attribute სავალდებულოა.',
		'string'           => ':attribute ტექსტი უნდა იყოს.',
		'max_string'       => ':attribute არ უნდა აღემატებოდეს :max სიმბოლოს.',
		'english_script'   => ':attribute მხოლოდ ინგლისურ დამწერლობას უნდა შეიცავდეს.',
		'georgian_script'  => ':attribute მხოლოდ ქართულ დამწერლობას უნდა შეიცავდეს.',
		'integer'          => ':attribute მთელი რიცხვი უნდა იყოს.',
		'year_range'       => ':attribute უნდა იყოს 1888-დან :max წლამდე.',
		'genres_required'  => 'აირჩიეთ მინიმუმ ერთი ჟანრი.',
		'genres_array'     => 'არჩეული ჟანრები არასწორია.',
		'genre_invalid'    => 'არჩეული ჟანრი არასწორია.',
		'genre_distinct'   => 'თითოეული ჟანრის არჩევა მხოლოდ ერთხელ შეიძლება.',
		'poster_required'  => 'პოსტერი სავალდებულოა.',
		'poster_type'      => 'პოსტერი უნდა იყოს JPEG, PNG ან WebP გამოსახულება.',
		'poster_size'      => 'პოსტერი არ უნდა აღემატებოდეს 10 მბ-ს.',
	],
];
