<?php

namespace Tests\Feature;

use Tests\TestCase;

class SpaRenderTest extends TestCase
{
    public function test_spa_root_endpoint_renders_successfully(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('id="app"', false);
        $response->assertSee('Cairo', false);
    }

    public function test_spa_catch_all_routes_render_spa(): void
    {
        $response = $this->get('/target-selling');

        $response->assertStatus(200);
        $response->assertSee('id="app"', false);
    }
}
