<?php

return [
	'fields' => [
		'body' => 'comment',
	],
	'validation' => [
		'required' => 'The :attribute field is required.',
		'string'   => 'The :attribute must be text.',
		'max'      => 'The :attribute may not be greater than :max characters.',
	],
];
