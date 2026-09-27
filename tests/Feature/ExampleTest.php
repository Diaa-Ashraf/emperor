<?php

it('returns a successful response for root SPA', function () {
    $response = $this->get('/');

    $response->assertOk();
});
