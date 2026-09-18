<?php

return [
	'fields' => [
		'body' => 'კომენტარი',
	],
	'validation' => [
		'required' => ':attribute სავალდებულოა.',
		'string'   => ':attribute ტექსტი უნდა იყოს.',
		'max'      => ':attribute არ უნდა აღემატებოდეს :max სიმბოლოს.',
	],
];
