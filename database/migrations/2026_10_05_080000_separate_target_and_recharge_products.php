<?php

use App\Enums\CategoryType;
use App\Enums\ProductType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Allow category_id to be nullable for target applications or standalone items
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id')->nullable()->change();
        });

        // 2. Update Category 'apps' naming and description
        DB::table('categories')
            ->where('slug', 'apps')
            ->update([
                'name' => 'تطبيقات البث والمحادثات',
                'description' => 'شحن كوينز وماسات تطبيقات البث المباشر والمحادثات الصوتية',
                'type' => CategoryType::VOICE_APPS->value,
                'updated_at' => now(),
            ]);

        // 3. Ensure store voice apps have type = PLAYER_ID (recharge)
        $storeAppSlugs = ['tiktok', 'bigo-live', 'likee', 'mico-live', 'yoho', 'haahlan', 'funup', 'popo-live'];
        DB::table('products')
            ->whereIn('slug', $storeAppSlugs)
            ->update([
                'type' => ProductType::PLAYER_ID->value,
                'updated_at' => now(),
            ]);

        // Clean names for store recharge products
        DB::table('products')->where('slug', 'tiktok')->update(['name' => 'تيك توك (TikTok Coins)']);
        DB::table('products')->where('slug', 'bigo-live')->update(['name' => 'بيجو لايف (Bigo Live)']);
        DB::table('products')->where('slug', 'likee')->update(['name' => 'لايكي (Likee Live)']);
        DB::table('products')->where('slug', 'mico-live')->update(['name' => 'ميكو لايف (Mico Live)']);
        DB::table('products')->where('slug', 'yoho')->update(['name' => 'يوهو (YoHo Voice Chat)']);

        // 4. Detach target apps from store categories
        DB::table('products')
            ->where('type', ProductType::TARGET->value)
            ->update([
                'category_id' => null,
                'updated_at' => now(),
            ]);

        // 5. Clear application caches
        try {
            Cache::flush();
        } catch (\Throwable $e) {
            // Ignore cache flush error during migration if cache driver is not reachable
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('categories')
            ->where('slug', 'apps')
            ->update([
                'name' => 'تطبيقات البث والتارجت',
                'updated_at' => now(),
            ]);
    }
};
