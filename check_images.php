<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$cats = \App\Models\Category::all();
echo "--- CATEGORIES ---\n";
foreach ($cats as $c) {
    echo "ID: {$c->id} | Name: {$c->name} | Slug: {$c->slug} | Icon: {$c->icon} | Banner: {$c->banner}\n";
}

$prods = \App\Models\Product::all();
echo "\n--- PRODUCTS ---\n";
foreach ($prods as $p) {
    echo "ID: {$p->id} | Name: {$p->name} | Slug: {$p->slug} | Image: {$p->image} | Cover: {$p->cover_image}\n";
}
