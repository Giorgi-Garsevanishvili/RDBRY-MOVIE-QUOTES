<?php

return [
	'fields' => [
		'body' => 'comment',
	],
	'validation' => [
		'required' => 'The :attribute field is required.',
		'string'   => 'The :attribute must be text.',
	],
];
